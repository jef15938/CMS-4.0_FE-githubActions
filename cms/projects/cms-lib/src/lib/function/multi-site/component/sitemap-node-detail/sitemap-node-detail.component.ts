import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { SiteMapNodeGetResponse } from '../../../../global/api/neuxAPI/bean/SiteMapNodeGetResponse';
import { ModalService } from '../../../ui/modal';
import { SitemapService, ContentService } from '../../../../global/api/service';
import { ContentEditorService, EditorMode } from '../../../ui/content-editor';
import { SiteMapNodeType, SiteMapUrlType, SiteMapUrlBlankType } from '../../../../global/enum/multi-site.enum';
import { AuditingSitemapModalComponent } from '../auditing-sitemap-modal/auditing-sitemap-modal.component';
import { PreviewInfoType } from '../../../../global/api/neuxAPI/bean/PreviewInfo';
import { FarmSharedService } from '../../../ui/farm-shared/farm-shared.service';
import { SitemapNodeUpdateModalComponent } from '../sitemap-node-update-modal/sitemap-node-update-modal.component';

@Component({
  selector: 'cms-sitemap-node-detail',
  templateUrl: './sitemap-node-detail.component.html',
  styleUrls: ['./sitemap-node-detail.component.scss']
})
export class SitemapNodeDetailComponent implements OnInit {

  @ViewChild('form') form: NgForm;

  SiteMapNodeType = SiteMapNodeType;
  SiteMapUrlType = SiteMapUrlType;

  @Input() siteID: string;
  @Input() parentID: string;
  @Input() nodeInfo: SiteMapNodeGetResponse;

  @Output() update = new EventEmitter<SiteMapNodeGetResponse>();

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

  ngOnInit(): void { }

  preview(languageID: string) {
    if (!this.nodeInfo.canPreview) { return; }
    const nodeID = this.nodeInfo.node_id;
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
    if (!this.nodeInfo.canModify) { return; }

    const noteType = this.nodeInfo.node_type;
    const nodeID = this.nodeInfo.node_id;

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
          }).subscribe(_ => this.update.emit(this.nodeInfo));
        });
        break;
      case SiteMapNodeType.FARM:
        const funcID = this.nodeInfo.func_id;
        this.farmSharedService.openFarm(funcID).subscribe(_ => this.update.emit(this.nodeInfo));
        break;
    }
  }

  auditingSiteMap() {
    this.modalService.openComponent({
      component: AuditingSitemapModalComponent,
      componentInitData: {
        siteId: this.siteID,
        sitemapNode: this.nodeInfo
      }
    }).subscribe(res => {
      if (res) {
        alert('送審成功');
        this.update.emit(this.nodeInfo);
      }
    });
  }

  editSitemapNode() {
    this.modalService.openComponent({
      component: SitemapNodeUpdateModalComponent,
      componentInitData: {
        parentID: this.parentID,
        nodeInfo: this.nodeInfo
      }
    }).subscribe(res => {
      if (res) {
        alert('修改成功');
        this.update.emit(this.nodeInfo);
      }
    });
  }

}
