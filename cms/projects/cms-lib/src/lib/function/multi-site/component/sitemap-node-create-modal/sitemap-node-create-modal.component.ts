import { Component, OnInit, Input } from '@angular/core';
import { UserSiteMapPostRequest } from '../../../../global/api/neuxAPI/bean/UserSiteMapPostRequest';
import { SitemapService, ContentService } from '../../../../global/api/service';
import { CustomModalBase, CustomModalActionButton } from './../../../ui/modal';
import { SiteMapNodeType, SiteMapUrlType, SiteMapUrlBlankType } from '../../../../global/enum/multi-site.enum';
import { LayoutInfo } from '../../../../global/api/neuxAPI/bean/LayoutInfo';
import { tap } from 'rxjs/operators';
import { MatCheckboxChange } from '@angular/material/checkbox';

class SiteMapCreateModel extends UserSiteMapPostRequest {

  constructor(parentId: string) {
    super();
    this.parent_id = parentId;
  }

  private clearLink() {
    this.url = undefined;
    this.url_blank = undefined;
    this.url_link_node_id = undefined;
    this.url_type = undefined;
  }

  private clearContent() {
    this.layout_id = undefined;
    this.content_path = undefined;
    this.meta_description = undefined;
    this.meta_image = undefined;
    this.meta_keyword = undefined;
  }

  checkFieldsByNodeType() {
    switch (this.node_type) {
      case null:
        this.clearLink();
        this.clearContent();
        break;
      case SiteMapNodeType.URL:
        this.clearContent();
        break;
      case SiteMapNodeType.CONTENT:
        this.clearLink();
        break;
    }
  }
}

@Component({
  selector: 'cms-sitemap-node-create-modal',
  templateUrl: './sitemap-node-create-modal.component.html',
  styleUrls: ['./sitemap-node-create-modal.component.scss']
})
export class SitemapNodeCreateModalComponent extends CustomModalBase implements OnInit {
  title = '新增節點';
  actions: CustomModalActionButton[];

  NodeType = SiteMapNodeType;
  UrlType = SiteMapUrlType;

  @Input() siteId: string;
  @Input() parentId: string;

  activedLayoutID: string;

  sitemapMaintainModel: SiteMapCreateModel;
  layouts: LayoutInfo[] = [];

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
    private sitemapService: SitemapService,
    private contentService: ContentService,
  ) { super(); }

  ngOnInit(): void {
    this.sitemapMaintainModel = new SiteMapCreateModel(this.parentId);
    this.getLayouts().subscribe();
  }

  getLayouts() {
    return this.contentService.getLayout().pipe(
      tap(layouts => this.layouts = layouts)
    );
  }

  confirm() {
    this.sitemapService.createSiteNode(
      this.siteId,
      this.sitemapMaintainModel.node_name,
      this.sitemapMaintainModel.meta_title,
      this.sitemapMaintainModel
    ).subscribe(_ => {
      this.close('Created');
    });
  }

  onSelectedLayoutCheckedChange(ev: MatCheckboxChange, layout: LayoutInfo) {
    if (ev.checked) {
      this.sitemapMaintainModel.layout_id = layout.layout_id;
    } else {
      this.sitemapMaintainModel.layout_id = undefined;
    }
  }

  setActivedLayout(layout: LayoutInfo, actived: boolean) {
    if (actived) {
      this.activedLayoutID = layout.layout_id;
    } else if (this.activedLayoutID === layout.layout_id) {
      this.activedLayoutID = undefined;
    }
  }

}
