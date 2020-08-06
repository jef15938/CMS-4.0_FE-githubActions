import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CustomModalBase, CustomModalActionButton, TreeComponent } from '../../../ui';
import { GroupService, MenuService } from '../../../../global/api/service';
import { MenuInfo } from '../../../../global/api/neuxAPI/bean/MenuInfo';
import { forkJoin } from 'rxjs';
import { GroupMenuInfo } from '../../../../global/api/neuxAPI/bean/GroupMenuInfo';

@Component({
  selector: 'cms-admin-group-menu-setting-modal',
  templateUrl: './admin-group-menu-setting-modal.component.html',
  styleUrls: ['./admin-group-menu-setting-modal.component.css']
})
export class AdminGroupMenuSettingModalComponent extends CustomModalBase implements OnInit {
  title = '設定後台功能';
  actions: CustomModalActionButton[];

  @ViewChild(TreeComponent) tree: TreeComponent<MenuInfo>;

  @Input() groupID: string;

  menus: MenuInfo[];
  checkedNodes: MenuInfo[] = [];

  constructor(
    private menuService: MenuService,
    private groupService: GroupService,
  ) { super(); }

  ngOnInit(): void {
    forkJoin([
      this.groupService.getGroupMenuList(this.groupID),
      this.menuService.getCMSMenu()
    ]).subscribe(([groupMenuInfos, menus]) => {
      this.checkedNodes = this.getMenuInfosByFuncIds(groupMenuInfos.map(info => info.func_id), menus);
      this.menus = menus;
    });
  }

  private getMenuInfosByFuncIds(funcIds: string[], sources: MenuInfo[], results: MenuInfo[] = []): MenuInfo[] {
    if (!sources?.length) { return results; }
    results = results.concat(sources.filter(source => funcIds.indexOf(source.func_id) > -1));
    sources = sources.reduce((a, b) => a.concat(b.children || []), []);
    return this.getMenuInfosByFuncIds(funcIds, sources, results);
  }

  confirm() {
    const checkedNodes: MenuInfo[] = this.tree.getSelectedNodes();
    const groupMenuInfos: GroupMenuInfo[] = checkedNodes.map(node => {
      const info = new GroupMenuInfo();
      info.func_id = node.func_id;
      return info;
    });
    this.groupService.updateGroupMenu(this.groupID, groupMenuInfos).subscribe(_ => this.close('Success'));
  }

}
