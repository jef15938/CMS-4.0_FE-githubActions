import { Component, OnInit, Input } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from 'projects/cms-lib/src/lib/ui/modal/custom-modal-base';
import { UserSiteMapPostRequest } from 'projects/cms-lib/src/lib/neuxAPI/bean/UserSiteMapPostRequest';
import { SiteMapNodeType, SiteMapUrlType, SiteMapUrlBlankType } from '../../multi-site.enum';

class SiteMapCreateModel extends UserSiteMapPostRequest {
  node_type = SiteMapNodeType.None;
  constructor(parent_id: string) {
    super();
    this.parent_id = parent_id;
  }
}

@Component({
  selector: 'cms-sitemap-node-create-modal',
  templateUrl: './sitemap-node-create-modal.component.html',
  styleUrls: ['./sitemap-node-create-modal.component.css']
})
export class SitemapNodeCreateModalComponent extends CustomModalBase implements OnInit {
  title = '新增節點';
  actions: CustomModalActionButton[];

  NodeType = SiteMapNodeType;
  UrlType = SiteMapUrlType;

  @Input() parent_id: string;

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
    { value: SiteMapNodeType.None, name: '無' },
    { value: SiteMapNodeType.Url, name: '連結' },
    { value: SiteMapNodeType.Content, name: '頁面' },
  ];

  constructor() { super(); }

  ngOnInit(): void {
    this.sitemapMaintainModel = new SiteMapCreateModel(this.parent_id);
  }

  onNodeTypeChange(event) {
    console.warn('onNodeTypeChange() event = ', event);
  }

  confirm(){
    this.close('Created');
  }

}
