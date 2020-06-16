import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, Output, EventEmitter } from '@angular/core';
import { UserSiteMapPutRequest } from './../../../../../neuxAPI/bean/UserSiteMapPutRequest';
import { NgForm } from '@angular/forms';
import { SiteMapNodeType, SiteMapUrlType, SiteMapUrlBlankType } from '../../multi-site.enum';
import { SiteMapUpdateInfo } from '../../multi-site.interface';
import { ModalService } from './../../../../../ui/modal/modal.service';
import { ContentService } from './../../../../../service/content.service';
import { ContentEditorService } from './../../../../../ui/content-editor/content-editor.service';
import { forkJoin } from 'rxjs';
import { EditorMode } from './../../../../../ui/content-editor/content-editor.interface';
import { SiteMapNodeInfo } from './../../../../../neuxAPI/bean/SiteMapNodeInfo';
import { SitemapService } from './../../../../../service/sitemap.service';

class SiteMapUpdateModel extends UserSiteMapPutRequest {
  constructor(siteMapInfo: SiteMapNodeInfo, parent_id: string, node_orders: string) {
    super();
    this.node_name = siteMapInfo.node_name;
    this.node_orders = node_orders;
    this.parent_id = parent_id;
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

  @Input() siteMapUpdateInfo: SiteMapUpdateInfo;

  @Output() updated = new EventEmitter<UserSiteMapPutRequest>();

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
    if (changes['siteMapUpdateInfo']) {
      const info: SiteMapUpdateInfo = changes['siteMapUpdateInfo'].currentValue;
      if (info?.siteMap) {
        this.sitemapMaintainModel = new SiteMapUpdateModel(info.siteMap, info.parentId, info.nodeOrder);
        if (this.form) {
          for (let controlName of Object.keys(this.form.controls)) {
            const c = this.form.controls[controlName];
            c.markAsUntouched();
            c.markAsPristine();
          }
        }
      }
    }
  }

  editContent(layoutId: string) {
    forkJoin([
      this.contentService.getContentByContentID(layoutId),
      this.contentService.getTemplateByControlID(layoutId),
    ]).subscribe(([contentInfo, selectableTemplates]) => {
      this.contentEditorService.openEditor({
        contentInfo,
        selectableTemplates,
        mode: EditorMode.EDIT,
      }).subscribe()
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
      this.updated.emit(this.sitemapMaintainModel);
    });
  }

}
