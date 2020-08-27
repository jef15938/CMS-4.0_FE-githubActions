import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CustomModalBase, CustomModalActionButton, TreeComponent } from '../../../ui';
import { GroupService, MenuService } from '../../../../global/api/service';
import { forkJoin } from 'rxjs';
import { MenuInfoModel } from '../../../../global/api/data-model/models/menu-info.model';
import { GroupMenuInfoModel } from '../../../../global/api/data-model/models/group-menu-info.model';

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

  menus: MenuInfoModel[];
  checkedNodes: MenuInfoModel[] = [];

  constructor(
    private menuService: MenuService,
    private groupService: GroupService,
  ) { super(); }

  ngOnInit(): void {
    forkJoin([
      this.groupService.getGroupMenuList(this.groupID),
      this.menuService.getCMSMenu()
    ]).subscribe(([groupMenuInfos, menus]) => {
      this.checkedNodes = this.getMenuInfosByFuncIds(groupMenuInfos.map(info => info.funcId), menus);
      this.menus = menus;
    });
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
    this.groupService.updateGroupMenu(this.groupID, groupMenuInfos).subscribe(_ => this.close('Success'));
  }

  hideNode(node: MenuInfoModel) {
    return false;
  }

}
