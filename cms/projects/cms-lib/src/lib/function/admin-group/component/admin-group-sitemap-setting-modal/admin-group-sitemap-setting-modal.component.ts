import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CustomModalActionButton, CustomModalBase, TreeComponent } from '../../../ui';
import { SitemapService, GroupService } from '../../../../global/api/service';
import { SiteMapGetResponse } from '../../../../global/api/neuxAPI/bean/SiteMapGetResponse';
import { SiteInfo } from '../../../../global/api/neuxAPI/bean/SiteInfo';
import { AdminGroupSitemapSettingNodeComponent } from '../admin-group-sitemap-setting-node/admin-group-sitemap-setting-node.component';
import { GroupSitemapInfo } from '../../../../global/api/neuxAPI/bean/GroupSitemapInfo';
import { forkJoin } from 'rxjs';

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

  siteID = 'none';
  sites: SiteInfo[] = [];

  nodes: Node[];
  checkedNodes: Node[] = [];

  constructor(
    private sitemapService: SitemapService,
    private groupService: GroupService,
  ) { super(); }

  ngOnInit(): void {
    this.sitemapService.getSiteList().subscribe(sites => this.sites = sites);
  }

  onSelectionChange(ev) {
    this.nodes = null;
    this.checkedNodes = [];

    if (this.siteID === 'none') { return; }

    forkJoin([
      this.sitemapService.getCMSSiteMap(this.siteID),
      this.groupService.getGroupSiteMapList(this.siteID, this.groupID),
    ]).subscribe(([sitemaps, groupSitemapInfos]) => {
      this.nodes = this.convertToNodes(sitemaps, groupSitemapInfos);
      this.checkedNodes = this.getNodesByNodeIds(groupSitemapInfos.map(info => info.node_id), this.nodes);
    });
  }

  private convertToNodes(sitemaps: SiteMapGetResponse[], groupSitemapInfos: GroupSitemapInfo[]): Node[] {
    return sitemaps.map(sitemap => {
      const node = new Node();
      for (const key in sitemap) {
        node[key] = sitemap[key];
      }

      const groupSitemapInfo = new GroupSitemapInfo();
      node.groupSitemapInfo = groupSitemapInfo;

      const groupSitemapInfoByNodeID = groupSitemapInfos.find(info => info.node_id === sitemap.node_id);
      if (groupSitemapInfoByNodeID) {
        node.isChecked = true;
        node.groupSitemapInfo.can_add = groupSitemapInfoByNodeID.can_add;
        node.groupSitemapInfo.can_delete = groupSitemapInfoByNodeID.can_delete;
        node.groupSitemapInfo.can_modify = groupSitemapInfoByNodeID.can_modify;
        node.groupSitemapInfo.node_id = groupSitemapInfoByNodeID.node_id;
      }

      node.children = this.convertToNodes(node.children, groupSitemapInfos);
      return node;
    });
  }

  private getNodesByNodeIds(nodeIds: string[], sources: Node[], results: Node[] = []): Node[] {
    if (!sources?.length) { return results; }
    results = results.concat(sources.filter(source => nodeIds.indexOf(source.node_id) > -1));
    sources = sources.reduce((a, b) => a.concat(b.children || []), []);
    return this.getNodesByNodeIds(nodeIds, sources, results);
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
    const groupSitemapInfos: GroupSitemapInfo[] = checkedNodes.map(node => {
      const info = new GroupSitemapInfo();
      info.node_id = node.node_id;
      info.can_add = node.groupSitemapInfo.can_add;
      info.can_delete = node.groupSitemapInfo.can_delete;
      info.can_modify = node.groupSitemapInfo.can_modify;
      return info;
    });
    this.groupService.updateGroupSitemap(this.siteID, this.groupID, groupSitemapInfos).subscribe(_ => this.close('Success'));
  }

}
