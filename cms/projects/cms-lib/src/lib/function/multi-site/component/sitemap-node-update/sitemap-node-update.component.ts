import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { UserSiteMapPutRequest } from '../../../../global/api/neuxAPI/bean/UserSiteMapPutRequest';
import { SiteMapNodeInfo } from '../../../../global/api/neuxAPI/bean/SiteMapNodeInfo';
import { ModalService } from './../../../ui/modal';
import { SitemapService, ContentService } from '../../../../global/api/service';
import { ContentEditorService, EditorMode } from './../../../ui/content-editor';
import { SiteMapNodeType, SiteMapUrlType, SiteMapUrlBlankType } from '../../../../global/enum/multi-site.enum';
import { SiteMapUpdateInfo } from './../../../../global/interface';
import { AuditingSitemapModalComponent } from '../auditing-sitemap-modal/auditing-sitemap-modal.component';

class SiteMapUpdateModel extends UserSiteMapPutRequest {
  constructor(siteMapInfo: SiteMapNodeInfo, parentId: string, nodeOrders: string) {
    super();
    this.node_name = siteMapInfo.node_name;
    this.node_orders = nodeOrders;
    this.parent_id = parentId;
    // URL
    this.url = siteMapInfo.url;
    this.url_blank = siteMapInfo.url_blank;
    this.url_link_node_id = siteMapInfo.url_link_node_id;
    this.url_type = siteMapInfo.url_type;
    // CONTENT
    this.content_path = siteMapInfo.content_path;
    this.meta_description = siteMapInfo.meta_description;
    this.meta_image = siteMapInfo.meta_image;
    this.meta_keyword = siteMapInfo.meta_keyword;
    this.meta_title = siteMapInfo.meta_title;
  }
}

@Component({
  selector: 'cms-sitemap-node-update',
  templateUrl: './sitemap-node-update.component.html',
  styleUrls: ['./sitemap-node-update.component.scss']
})
export class SitemapNodeUpdateComponent implements OnInit, OnChanges {

  @ViewChild('form') form: NgForm;

  NodeType = SiteMapNodeType;
  UrlType = SiteMapUrlType;

  @Input() siteId: string;
  @Input() siteMapUpdateInfo: SiteMapUpdateInfo;

  @Output() update = new EventEmitter<UserSiteMapPutRequest>();

  sitemapMaintainModel: SiteMapUpdateModel;

  urlTypeOptions: { value: SiteMapUrlType, name: string }[] = [
    { value: SiteMapUrlType.Inside, name: '站內' },
    { value: SiteMapUrlType.Outside, name: '站外' },
  ];

  urlBlankTypeOptions: { value: SiteMapUrlBlankType, name: string }[] = [
    { value: SiteMapUrlBlankType.Yes, name: '是' },
    { value: SiteMapUrlBlankType.No, name: '否' },
  ];

  nodeTypeOptions: { value: SiteMapNodeType, name: string }[] = [
    { value: null, name: '無' },
    { value: SiteMapNodeType.Url, name: '連結' },
    { value: SiteMapNodeType.Content, name: '頁面' },
  ];

  constructor(
    private modalService: ModalService,
    private contentService: ContentService,
    private contentEditorService: ContentEditorService,
    private sitemapService: SitemapService,
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

  editContent(nodeId: string) {
    forkJoin([
      this.contentService.getContentByContentID(nodeId),
      this.contentService.getTemplateByControlID(nodeId),
    ]).subscribe(([contentInfo, selectableTemplates]) => {
      this.contentEditorService.openEditor({
        // onSaved: () => { this.update.emit(this.sitemapMaintainModel); },
        contentID: nodeId,
        contentInfo,
        selectableTemplates,
        editorMode: EditorMode.EDIT,
      }).subscribe();
    });
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
      this.sitemapMaintainModel.node_name,
      this.sitemapMaintainModel.node_orders,
      this.sitemapMaintainModel.meta_title,
      this.sitemapMaintainModel
    ).subscribe(_ => {
      alert('修改成功');
      this.update.emit(this.sitemapMaintainModel);
    });
  }

}
