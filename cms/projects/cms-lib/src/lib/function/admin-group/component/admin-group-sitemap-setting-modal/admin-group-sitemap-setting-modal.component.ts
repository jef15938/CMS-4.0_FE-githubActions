import { Component, OnInit, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { CustomModalActionButton, CustomModalBase, TreeComponent } from '../../../ui';
import { SitemapService, GroupService } from '../../../../global/api/service';
import { AdminGroupSitemapSettingNodeComponent } from '../admin-group-sitemap-setting-node/admin-group-sitemap-setting-node.component';
import { forkJoin, Observable, fromEvent, iif, of } from 'rxjs';
import { GroupSitemapInfoModel } from '../../../../global/api/data-model/models/group-sitemap-info.model';
import { SiteInfoModel } from '../../../../global/api/data-model/models/site-info.model';
import { SiteMapGetResponseModel } from '../../../../global/api/data-model/models/site-map-get-response.model';
import { CmsErrorHandler } from '../../../../global/error-handling';
import { MatSelect } from '@angular/material/select';
import { switchMap, map } from 'rxjs/operators';

class Node extends SiteMapGetResponseModel {
  groupSitemapInfo: GroupSitemapInfoModel;
  isChecked = false;
  children: Node[];
}

interface TreeData {
  nodes: Node[];
  checkedNodes: Node[];
}

@Component({
  selector: 'cms-admin-group-sitemap-setting-modal',
  templateUrl: './admin-group-sitemap-setting-modal.component.html',
  styleUrls: ['./admin-group-sitemap-setting-modal.component.scss']
})
export class AdminGroupSitemapSettingModalComponent extends CustomModalBase implements OnInit, AfterViewInit {
  title = '設定前台節點';
  actions: CustomModalActionButton[];

  @ViewChild(TreeComponent) tree: TreeComponent<Node>;
  @ViewChild('select') select: MatSelect;

  customNodeRenderer = AdminGroupSitemapSettingNodeComponent;

  @Input() groupID: string;

  siteID = 'none';

  site$: Observable<SiteInfoModel[]>;
  treeData$: Observable<TreeData>;

  constructor(
    private sitemapService: SitemapService,
    private groupService: GroupService,
  ) { super(); }

  ngOnInit(): void {
    this.site$ = this.sitemapService.getSiteList().pipe(
      CmsErrorHandler.rxHandleError()
    );
  }

  ngAfterViewInit(): void {
    this.treeData$ = this.getTreeData();
  }

  private getTreeData() {
    return this.select.selectionChange.pipe(
      switchMap(_ => {
        if (this.siteID === 'none') { return of(null); }
        return forkJoin([
          this.sitemapService.getCMSSiteMap(this.siteID),
          this.groupService.getGroupSiteMapList(this.siteID, this.groupID),
        ]).pipe(
          CmsErrorHandler.rxHandleError((error, showMessage) => {
            showMessage();
            this.treeData$ = this.getTreeData();
          }),
          map(([sitemaps, groupSitemapInfos]) => {
            const nodes = this.convertToNodes(sitemaps, groupSitemapInfos);
            const checkedNodes = this.getNodesByNodeIds(groupSitemapInfos.map(info => info.nodeId), nodes);
            return { nodes, checkedNodes };
          }),
        );
      }),
    );
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

  private checkNodeStateByChecked(node: Node, checked: boolean, treeData: TreeData) {
    node.isChecked = checked;

    if (!node.isChecked) {
      node.groupSitemapInfo.canAdd = false;
      node.groupSitemapInfo.canDelete = false;
      node.groupSitemapInfo.canModify = false;
    }

    const allCheckedNodes = treeData.checkedNodes;

    if (checked && allCheckedNodes.indexOf(node) < 0) {
      allCheckedNodes.push(node);
    } else if (!checked && allCheckedNodes.indexOf(node) > -1) {
      const index = allCheckedNodes.indexOf(node);
      allCheckedNodes.splice(index, 1);
    }
  }

  onNodeCheckedChange(ev: { node: Node, checked: boolean }, treeData: TreeData) {
    const targetNode = ev.node;
    const checked = ev.checked;

    this.checkNodeStateByChecked(targetNode, checked, treeData);

    // 處理子層 => 勾選則子層全勾，取消則子層全取消
    let childrenOfTargetNode = targetNode.children || [];
    while (childrenOfTargetNode?.length) {
      childrenOfTargetNode.forEach(childOfNode => {
        this.checkNodeStateByChecked(childOfNode, checked, treeData);
      });
      childrenOfTargetNode = childrenOfTargetNode.reduce((a, b) => a.concat(b.children || []), []);
    }

    // 取消時不用處理父層
    if (checked) {
      // 處理父層 => 勾選往上的父層也要勾選
      let parent = this.tree.findParent(targetNode);
      while (parent) {
        this.checkNodeStateByChecked(parent, checked, treeData);
        parent = this.tree.findParent(parent);
      }
    }
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
      .pipe(CmsErrorHandler.rxHandleError())
      .subscribe(_ => this.close('Success'));
  }

}
