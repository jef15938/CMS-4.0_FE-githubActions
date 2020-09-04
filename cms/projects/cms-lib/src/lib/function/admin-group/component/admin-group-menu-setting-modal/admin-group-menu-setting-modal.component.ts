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
    this.treeData$ = forkJoin([
      this.groupService.getGroupMenuList(this.groupID).pipe(CmsErrorHandler.rxHandleError('取得群組資料錯誤')),
      this.menuService.getCMSMenu().pipe(CmsErrorHandler.rxHandleError('取得後台功能清單錯誤')),
    ]).pipe(
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
      .pipe(CmsErrorHandler.rxHandleError('更新資料錯誤'))
      .subscribe(_ => this.close('Success'));
  }

  onNodeCheckedChange(ev: { node: MenuInfoModel, checked: boolean }, treeData: TreeData) {
    // if (ev.checked) { // check parent if node checked
    //   const parent = this.tree.findParent(ev.node);
    //   if (parent) {
    //     if (parent && treeData.checkedNodes.indexOf(parent) < 0) {
    //       treeData.checkedNodes.push(parent);
    //     }
    //     this.onNodeCheckedChange({ node: parent, checked: true }, treeData);
    //   }
    // }
  }

}
