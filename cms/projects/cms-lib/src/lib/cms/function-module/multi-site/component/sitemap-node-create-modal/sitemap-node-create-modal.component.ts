import { Component, OnInit, Input } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from './../../../../../ui/modal/custom-modal-base';
import { UserSiteMapPostRequest } from './../../../../../neuxAPI/bean/UserSiteMapPostRequest';
import { SiteMapNodeType, SiteMapUrlType, SiteMapUrlBlankType } from '../../multi-site.enum';
import { SitemapService } from './../../../../../service/sitemap.service';

class SiteMapCreateModel extends UserSiteMapPostRequest {
  nodeType = null;

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
    switch (this.nodeType) {
      case null:
        this.clearLink();
        this.clearContent();
        break;
      case SiteMapNodeType.Url:
        this.clearContent();
        break;
      case SiteMapNodeType.Content:
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

  sitemapMaintainModel: SiteMapCreateModel;

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
    private siteMapService: SitemapService,
  ) { super(); }

  ngOnInit(): void {
    this.sitemapMaintainModel = new SiteMapCreateModel(this.parentId);
  }

  confirm() {
    this.siteMapService.createSiteNode(
      this.siteId,
      this.sitemapMaintainModel.node_name,
      this.sitemapMaintainModel.meta_title,
      this.sitemapMaintainModel
    ).subscribe(_ => {
      this.close('Created');
    });
  }

}
