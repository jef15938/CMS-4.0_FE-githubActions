import { Component, OnInit, Input } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from '../../../ui';
import { GroupService, MenuService, GroupMenuInfo } from '../../../../global/api/service';
import { MenuInfo } from '../../../../global/api/neuxAPI/bean/MenuInfo';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'cms-admin-group-menu-setting-modal',
  templateUrl: './admin-group-menu-setting-modal.component.html',
  styleUrls: ['./admin-group-menu-setting-modal.component.css']
})
export class AdminGroupMenuSettingModalComponent extends CustomModalBase implements OnInit {
  title = '設定後台功能';
  actions: CustomModalActionButton[];

  @Input() groupID: string;

  groupMenuInfos: GroupMenuInfo[] = [];
  menus: MenuInfo[];

  constructor(
    private menuService: MenuService,
    private groupService: GroupService,
  ) { super(); }

  ngOnInit(): void {
    forkJoin([
      this.groupService.getGroupMenuList(this.groupID),
      this.menuService.getCMSMenu()
    ]).subscribe(([groupMenuInfos, menus]) => {
      this.groupMenuInfos = groupMenuInfos;
      this.menus = menus;
    });
  }

  confirm() {

  }

}
