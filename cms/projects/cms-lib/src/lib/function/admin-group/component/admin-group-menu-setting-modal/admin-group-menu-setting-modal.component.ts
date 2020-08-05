import { Component, OnInit } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from '../../../ui';
import { MenuService } from '../../../../global/api/service';
import { MenuInfo } from '../../../../global/api/neuxAPI/bean/MenuInfo';

@Component({
  selector: 'cms-admin-group-menu-setting-modal',
  templateUrl: './admin-group-menu-setting-modal.component.html',
  styleUrls: ['./admin-group-menu-setting-modal.component.css']
})
export class AdminGroupMenuSettingModalComponent extends CustomModalBase implements OnInit {
  title: '';
  actions: CustomModalActionButton[];

  menus: MenuInfo[];

  constructor(
    private menuService: MenuService,
  ) { super(); }

  ngOnInit(): void {
    this.menuService.getCMSMenu().subscribe(menus => this.menus = menus);
  }

}
