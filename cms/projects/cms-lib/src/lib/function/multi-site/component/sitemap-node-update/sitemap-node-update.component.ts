import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { UserSiteMapPutRequest } from '../../../../global/api/neuxAPI/bean/UserSiteMapPutRequest';
import { SiteMapNodeGetResponse } from '../../../../global/api/neuxAPI/bean/SiteMapNodeGetResponse';
import { ModalService } from './../../../ui/modal';
import { SitemapService, ContentService } from '../../../../global/api/service';
import { ContentEditorService, EditorMode } from './../../../ui/content-editor';
import { SiteMapNodeType, SiteMapUrlType, SiteMapUrlBlankType } from '../../../../global/enum/multi-site.enum';
import { SiteMapUpdateInfo } from './../../../../global/interface';
import { AuditingSitemapModalComponent } from '../auditing-sitemap-modal/auditing-sitemap-modal.component';
import { PreviewInfoType } from '../../../../global/api/neuxAPI/bean/PreviewInfo';
import { FarmSharedService } from '../../../ui/farm-shared/farm-shared.service';

class SiteMapUpdateModel extends UserSiteMapPutRequest {
  constructor(siteMapInfo: SiteMapNodeGetResponse, parentId: string, nodeOrders: string) {
    super();
    this.parent_id = parentId;
    // URL
    this.url = siteMapInfo.url;
    this.url_blank = siteMapInfo.url_blank;
    this.url_link_node_id = siteMapInfo.url_link_node_id;
    this.url_type = siteMapInfo.url_type;
    // CONTENT
    this.content_path = siteMapInfo.content_path;
    // detail
    this.details = [].concat(siteMapInfo.details || []);
  }
}

@Component({
  selector: 'cms-sitemap-node-update',
  templateUrl: './sitemap-node-update.component.html',
  styleUrls: ['./sitemap-node-update.component.scss']
})
export class SitemapNodeUpdateComponent implements OnInit, OnChanges {

  @ViewChild('form') form: NgForm;

  SiteMapNodeType = SiteMapNodeType;
  SiteMapUrlType = SiteMapUrlType;

  @Input() siteId: string;
  @Input() siteMapUpdateInfo: SiteMapUpdateInfo;

  @Output() update = new EventEmitter<UserSiteMapPutRequest>();

  sitemapMaintainModel: SiteMapUpdateModel;

  urlTypeOptions: { value: SiteMapUrlType, name: string }[] = [
    { value: SiteMapUrlType.INSIDE, name: '站內' },
    { value: SiteMapUrlType.OUTSIDE, name: '站外' },
  ];

  urlBlankTypeOptions: { value: SiteMapUrlBlankType, name: string }[] = [
    { value: SiteMapUrlBlankType.YES, name: '是' },
    { value: SiteMapUrlBlankType.NO, name: '否' },
  ];

  nodeTypeOptions: { value: SiteMapNodeType, name: string }[] = [
    { value: null, name: '無' },
    { value: SiteMapNodeType.URL, name: '連結' },
    { value: SiteMapNodeType.CONTENT, name: '頁面' },
  ];

  constructor(
    private modalService: ModalService,
    private contentService: ContentService,
    private contentEditorService: ContentEditorService,
    private sitemapService: SitemapService,
    private farmSharedService: FarmSharedService,
  ) { }

  ngOnInit(): void {
    const info = this.siteMapUpdateInfo;
    if (info?.siteMap) {
      this.sitemapMaintainModel = new SiteMapUpdateModel(info.siteMap, info.parentId, info.nodeOrder);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.siteMapUpdateInfo) {
      const info: SiteMapUpdateInfo = changes.siteMapUpdateInfo.currentValue;
      if (info?.siteMap) {
        this.sitemapMaintainModel = new SiteMapUpdateModel(info.siteMap, info.parentId, info.nodeOrder);
        if (this.form) {
          for (const controlName of Object.keys(this.form.controls)) {
            const c = this.form.controls[controlName];
            c.markAsUntouched();
            c.markAsPristine();
          }
        }
      }
    }
  }

  preview(languageID: string) {
    if (!this.siteMapUpdateInfo.siteMap.canPreview) { return; }
    const nodeID = this.siteMapUpdateInfo.siteMap.node_id;
    this.sitemapService.getPreviewInfo(nodeID, languageID).subscribe(previewInfo => {
      switch (previewInfo.preview_type) {
        case PreviewInfoType.ONE_PAGE:
          window.open(previewInfo.url, '_blank', 'noopener=yes,noreferrer=yes');
          break;
        case PreviewInfoType.FARM:
          this.farmSharedService.openFarmPreview(previewInfo.func_id, previewInfo.data_id).subscribe();
          break;
      }
    });
  }

  editContent() {
    if (!this.siteMapUpdateInfo.siteMap.canModify) { return; }

    const noteType = this.siteMapUpdateInfo.siteMap.node_type;
    const nodeID = this.siteMapUpdateInfo.siteMap.node_id;

    switch (noteType) {
      case SiteMapNodeType.CONTENT:
        forkJoin([
          this.contentService.getContentByContentID(nodeID),
          this.contentService.getTemplateByControlID(nodeID),
        ]).subscribe(([contentInfo, selectableTemplates]) => {
          this.contentEditorService.openEditor({
            // onSaved: () => { this.update.emit(this.sitemapMaintainModel); },
            contentID: nodeID,
            contentInfo,
            selectableTemplates,
            editorMode: EditorMode.EDIT,
          }).subscribe();
        });
        break;
      case SiteMapNodeType.FARM:
        // TODO: 開啟網站管理
        const funcID = this.siteMapUpdateInfo.siteMap.func_id;
        this.farmSharedService.openFarm(funcID).subscribe();
        break;
    }
  }

  auditingSiteMap() {
    this.modalService.openComponent({
      component: AuditingSitemapModalComponent,
      componentInitData: {
        siteId: this.siteId,
        sitemapNode: this.siteMapUpdateInfo.siteMap
      }
    }).subscribe(res => {
      if (res) {
        alert('送審成功');
        this.update.emit(this.sitemapMaintainModel);
      }
    });
  }

  save() {
    this.sitemapService.updateSiteNode(
      this.siteMapUpdateInfo.siteMap.node_id,
      this.sitemapMaintainModel.details
    ).subscribe(_ => {
      alert('修改成功');
      this.update.emit(this.sitemapMaintainModel);
    });
  }

}
