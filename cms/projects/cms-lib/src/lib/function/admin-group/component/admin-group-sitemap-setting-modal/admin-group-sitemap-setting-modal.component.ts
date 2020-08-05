import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CustomModalActionButton, CustomModalBase, TreeComponent } from '../../../ui';
import { SitemapService, GroupService } from '../../../../global/api/service';
import { SiteMapGetResponse } from '../../../../global/api/neuxAPI/bean/SiteMapGetResponse';
import { SiteInfo } from '../../../../global/api/neuxAPI/bean/SiteInfo';
import { AdminGroupSitemapSettingNodeComponent } from '../admin-group-sitemap-setting-node/admin-group-sitemap-setting-node.component';
import { GroupSitemapInfo } from '../../../../global/api/neuxAPI/bean/GroupSitemapInfo';

class Node extends SiteMapGetResponse {
  groupSitemapInfo: GroupSitemapInfo;
  isChecked = false;
}

@Component({
  selector: 'cms-admin-group-sitemap-setting-modal',
  templateUrl: './admin-group-sitemap-setting-modal.component.html',
  styleUrls: ['./admin-group-sitemap-setting-modal.component.css']
})
export class AdminGroupSitemapSettingModalComponent extends CustomModalBase implements OnInit {
  title = '設定前台節點';
  actions: CustomModalActionButton[];

  @ViewChild(TreeComponent) tree: TreeComponent<Node>;

  customNodeRenderer = AdminGroupSitemapSettingNodeComponent;

  @Input() groupID: string;


  nodes: Node[] = [];

  groupSitemapInfo: GroupSitemapInfo[] = [];

  siteID = 'none';
  sites: SiteInfo[] = [];
  sitemaps: SiteMapGetResponse[];

  constructor(
    private sitemapService: SitemapService,
    private groupService: GroupService,
  ) { super(); }

  ngOnInit(): void {
    this.sitemapService.getSiteList().subscribe(sites => this.sites = sites);
    this.groupService.getGroupSiteMapList(this.groupID).subscribe(groupSitemapInfo => this.groupSitemapInfo = groupSitemapInfo);
  }

  onSelectionChange(ev) {
    if (this.siteID === 'none') {
      this.sitemaps = null;
      return;
    }
    this.sitemapService.getCMSSiteMap(this.siteID).subscribe(sitemaps => {
      this.nodes = this.convertToNodes(sitemaps);
    });
  }

  private convertToNodes(sitemaps: SiteMapGetResponse[]): Node[] {
    return sitemaps.map(sitemap => {
      const node = new Node();
      for (const key in sitemap) {
        node[key] = sitemap[key];
      }
      const groupSitemapInfo = new GroupSitemapInfo();
      node.groupSitemapInfo = groupSitemapInfo;

      node.children = this.convertToNodes(node.children);
      return node;
    });
  }

  onNodeCheckedChange(ev: { node: Node, checked: boolean }) {
    const node = ev.node;
    node.isChecked = ev.checked;
    if (!node.isChecked) {
      node.groupSitemapInfo.can_add = false;
      node.groupSitemapInfo.can_delete = false;
      node.groupSitemapInfo.can_modify = false;
    }
  }

  confirm() {
    const checkedNodes: Node[] = this.tree.getSelectedNodes();
    console.warn('checkedNodes = ', checkedNodes);
    const groupSitemapInfos: GroupSitemapInfo[] = checkedNodes.map(node => {
      const info = new GroupSitemapInfo();
      info.node_id = node.node_id;
      info.can_add = node.groupSitemapInfo.can_add;
      info.can_delete = node.groupSitemapInfo.can_delete;
      info.can_modify = node.groupSitemapInfo.can_modify;
      return info;
    });
    this.groupService.updateGroupSitemap(this.groupID, groupSitemapInfos).subscribe();
  }

}
