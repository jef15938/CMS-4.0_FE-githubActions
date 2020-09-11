import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CustomModalBase, CustomModalActionButton, TreeComponent } from '../../../ui';
import { GroupService, MenuService } from '../../../../global/api/service';
import { forkJoin, Observable } from 'rxjs';
import { MenuInfoModel } from '../../../../global/api/data-model/models/menu-info.model';
import { GroupMenuInfoModel } from '../../../../global/api/data-model/models/group-menu-info.model';
import { CmsErrorHandler } from '../../../../global/error-handling';
import { map } from 'rxjs/operators';

interface TreeData {
  menus: MenuInfoModel[];
  checkedNodes: MenuInfoModel[];
}

@Component({
  selector: 'cms-admin-group-menu-setting-modal',
  templateUrl: './admin-group-menu-setting-modal.component.html',
  styleUrls: ['./admin-group-menu-setting-modal.component.scss']
})
export class AdminGroupMenuSettingModalComponent extends CustomModalBase implements OnInit {
  title = '設定後台功能';
  actions: CustomModalActionButton[];

  @ViewChild(TreeComponent) tree: TreeComponent<MenuInfoModel>;

  @Input() groupID: string;

  treeData$: Observable<TreeData>;

  constructor(
    private menuService: MenuService,
    private groupService: GroupService,
  ) { super(); }

  ngOnInit(): void {
    this.treeData$ = this.getTreeData();
  }

  private getTreeData() {
    return forkJoin([
      this.groupService.getGroupMenuList(this.groupID),
      this.menuService.getCMSMenu(),
    ]).pipe(
      CmsErrorHandler.rxHandleError((error, showMessage) => {
        showMessage();
        this.treeData$ = this.getTreeData();
      }),
      map(([groupMenuInfos, menus]) => {
        const checkedNodes = this.getMenuInfosByFuncIds(groupMenuInfos.map(info => info.funcId), menus);
        return { menus, checkedNodes };
      })
    );
  }

  private getMenuInfosByFuncIds(funcIds: string[], sources: MenuInfoModel[], results: MenuInfoModel[] = []): MenuInfoModel[] {
    if (!sources?.length) { return results; }
    results = results.concat(sources.filter(source => funcIds.indexOf(source.funcId) > -1));
    sources = sources.reduce((a, b) => a.concat(b.children || []), []);
    return this.getMenuInfosByFuncIds(funcIds, sources, results);
  }

  confirm() {
    const checkedNodes: MenuInfoModel[] = this.tree.getSelectedNodes();
    const groupMenuInfos: GroupMenuInfoModel[] = checkedNodes.map(node => {
      const info = new GroupMenuInfoModel();
      info.funcId = node.funcId;
      return info;
    });
    this.groupService.updateGroupMenu(this.groupID, groupMenuInfos)
      .pipe(CmsErrorHandler.rxHandleError())
      .subscribe(_ => this.close('Success'));
  }

  private checkNodeStateByChecked(node: MenuInfoModel, checked: boolean, treeData: TreeData) {
    const allCheckedNodes = treeData.checkedNodes;
    if (checked && allCheckedNodes.indexOf(node) < 0) {
      allCheckedNodes.push(node);
    } else if (!checked && allCheckedNodes.indexOf(node) > -1) {
      const index = allCheckedNodes.indexOf(node);
      allCheckedNodes.splice(index, 1);
    }
  }

  onNodeCheckedChange(ev: { node: MenuInfoModel, checked: boolean }, treeData: TreeData) {
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

}
