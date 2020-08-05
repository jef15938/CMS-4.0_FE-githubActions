import { Component, OnInit, OnDestroy } from '@angular/core';
import { CmsTreeNodeRenderer, CmsTreeNode } from '../../../ui';
import { SiteMapGetResponse } from '../../../../global/api/neuxAPI/bean/SiteMapGetResponse';
import { GroupSitemapInfo } from '../../../../global/api/service';
import { Subject } from 'rxjs';

interface Node extends SiteMapGetResponse {
  groupSitemapInfo: GroupSitemapInfo;
  isChecked: boolean;
}

@Component({
  selector: 'cms-admin-group-sitemap-setting-node',
  templateUrl: './admin-group-sitemap-setting-node.component.html',
  styleUrls: ['./admin-group-sitemap-setting-node.component.scss']
})
export class AdminGroupSitemapSettingNodeComponent implements CmsTreeNodeRenderer<Node>, OnInit, OnDestroy {

  node: CmsTreeNode<Node>;

  private destroy$ = new Subject();

  constructor() { }

  // called before ngOnInit()
  compInit(node: CmsTreeNode<Node>) {
    this.node = node;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  cancelEvent(ev: MouseEvent) {
    ev.stopPropagation();
    ev.preventDefault();
  }

  changeCanAdd() {
    this.node.data.groupSitemapInfo.can_add = !!!this.node.data.groupSitemapInfo.can_add;
  }

  changeCanModify() {
    this.node.data.groupSitemapInfo.can_modify = !!!this.node.data.groupSitemapInfo.can_modify;
  }

  changeCanDelete() {
    this.node.data.groupSitemapInfo.can_delete = !!!this.node.data.groupSitemapInfo.can_delete;
  }

}
