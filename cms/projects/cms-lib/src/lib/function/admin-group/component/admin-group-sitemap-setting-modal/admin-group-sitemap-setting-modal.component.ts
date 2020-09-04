import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CustomModalActionButton, CustomModalBase, TreeComponent } from '../../../ui';
import { SitemapService, GroupService } from '../../../../global/api/service';
import { AdminGroupSitemapSettingNodeComponent } from '../admin-group-sitemap-setting-node/admin-group-sitemap-setting-node.component';
import { forkJoin } from 'rxjs';
import { GroupSitemapInfoModel } from '../../../../global/api/data-model/models/group-sitemap-info.model';
import { SiteInfoModel } from '../../../../global/api/data-model/models/site-info.model';
import { SiteMapGetResponseModel } from '../../../../global/api/data-model/models/site-map-get-response.model';
import { CmsErrorHandler } from '../../../../global/error-handling';

class Node extends SiteMapGetResponseModel {
  groupSitemapInfo: GroupSitemapInfoModel;
  isChecked = false;
}

@Component({
  selector: 'cms-admin-group-sitemap-setting-modal',
  templateUrl: './admin-group-sitemap-setting-modal.component.html',
  styleUrls: ['./admin-group-sitemap-setting-modal.component.scss']
})
export class AdminGroupSitemapSettingModalComponent extends CustomModalBase implements OnInit {
  title = '設定前台節點';
  actions: CustomModalActionButton[];

  @ViewChild(TreeComponent) tree: TreeComponent<Node>;

  customNodeRenderer = AdminGroupSitemapSettingNodeComponent;

  @Input() groupID: string;

  siteID = 'none';
  sites: SiteInfoModel[] = [];

  treeData: {
    nodes: Node[],
    checkedNodes: Node[],
  } = null;

  constructor(
    private sitemapService: SitemapService,
    private groupService: GroupService,
  ) { super(); }

  ngOnInit(): void {
    this.sitemapService.getSiteList().subscribe(sites => this.sites = sites);
  }

  onSelectionChange(ev) {
    this.treeData = null;

    if (this.siteID === 'none') { return; }

    forkJoin([
      this.sitemapService.getCMSSiteMap(this.siteID).pipe(CmsErrorHandler.rxHandleError('取得群組資料錯誤')),
      this.groupService.getGroupSiteMapList(this.siteID, this.groupID).pipe(CmsErrorHandler.rxHandleError('取得前台節點清單錯誤')),
    ]).subscribe(([sitemaps, groupSitemapInfos]) => {
      const nodes = this.convertToNodes(sitemaps, groupSitemapInfos);
      const checkedNodes = this.getNodesByNodeIds(groupSitemapInfos.map(info => info.nodeId), nodes);
      this.treeData = { nodes, checkedNodes };
    });
  }

  private convertToNodes(sitemaps: SiteMapGetResponseModel[], groupSitemapInfos: GroupSitemapInfoModel[]): Node[] {
    return sitemaps.map(sitemap => {
      const node = new Node();
      for (const key in sitemap) {
        node[key] = sitemap[key];
      }

      const groupSitemapInfo = new GroupSitemapInfoModel();
      node.groupSitemapInfo = groupSitemapInfo;

      const groupSitemapInfoByNodeID = groupSitemapInfos.find(info => info.nodeId === sitemap.nodeId);
      if (groupSitemapInfoByNodeID) {
        node.isChecked = true;
        node.groupSitemapInfo.canAdd = groupSitemapInfoByNodeID.canAdd;
        node.groupSitemapInfo.canDelete = groupSitemapInfoByNodeID.canDelete;
        node.groupSitemapInfo.canModify = groupSitemapInfoByNodeID.canModify;
        node.groupSitemapInfo.nodeId = groupSitemapInfoByNodeID.nodeId;
      }

      node.children = this.convertToNodes(node.children, groupSitemapInfos);
      return node;
    });
  }

  private getNodesByNodeIds(nodeIds: string[], sources: Node[], results: Node[] = []): Node[] {
    if (!sources?.length) { return results; }
    results = results.concat(sources.filter(source => nodeIds.indexOf(source.nodeId) > -1));
    sources = sources.reduce((a, b) => a.concat(b.children || []), []);
    return this.getNodesByNodeIds(nodeIds, sources, results);
  }

  onNodeCheckedChange(ev: { node: Node, checked: boolean }) {
    const node = ev.node;
    node.isChecked = ev.checked;
    if (!node.isChecked) {
      node.groupSitemapInfo.canAdd = false;
      node.groupSitemapInfo.canDelete = false;
      node.groupSitemapInfo.canModify = false;
    }

    // if (ev.checked) { // check parent if node checked
    //   const parent = this.tree.findParent(ev.node);
    //   if (parent) {
    //     if (parent && this.treeData.checkedNodes.indexOf(parent) < 0) {
    //       this.treeData.checkedNodes.push(parent);
    //     }
    //     this.onNodeCheckedChange({ node: parent, checked: true });
    //   }
    // }
  }

  confirm() {
    const checkedNodes: Node[] = this.tree.getSelectedNodes();
    const groupSitemapInfos: GroupSitemapInfoModel[] = checkedNodes.map(node => {
      const info = new GroupSitemapInfoModel();
      info.nodeId = node.nodeId;
      info.canAdd = node.groupSitemapInfo.canAdd;
      info.canDelete = node.groupSitemapInfo.canDelete;
      info.canModify = node.groupSitemapInfo.canModify;
      return info;
    });
    this.groupService.updateGroupSitemap(this.siteID, this.groupID, groupSitemapInfos)
      .pipe(CmsErrorHandler.rxHandleError('更新資料錯誤'))
      .subscribe(_ => this.close('Success'));
  }

}
