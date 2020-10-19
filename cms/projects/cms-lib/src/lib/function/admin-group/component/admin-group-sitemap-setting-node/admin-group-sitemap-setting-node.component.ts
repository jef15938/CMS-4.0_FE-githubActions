import { Component, OnInit, OnDestroy } from '@angular/core';
import { CmsTreeNodeRenderer, CmsTreeNode } from '../../../ui';
import { Subject } from 'rxjs';
import { SiteMapGetResponseModel } from '../../../../global/api/data-model/models/site-map-get-response.model';
import { GroupSitemapInfoModel } from '../../../../global/api/data-model/models/group-sitemap-info.model';

interface Node extends SiteMapGetResponseModel {
  groupSitemapInfo: GroupSitemapInfoModel;
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
    this.node.data.groupSitemapInfo.canAdd = !!!this.node.data.groupSitemapInfo.canAdd;
  }

  changeCanModify() {
    this.node.data.groupSitemapInfo.canModify = !!!this.node.data.groupSitemapInfo.canModify;
  }

  changeCanDelete() {
    this.node.data.groupSitemapInfo.canDelete = !!!this.node.data.groupSitemapInfo.canDelete;
  }

}
