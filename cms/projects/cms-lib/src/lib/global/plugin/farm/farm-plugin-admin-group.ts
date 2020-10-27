import { FarmPlugin, FarmPluginTableActionBtn } from '../../../function/ui/farm-shared/farm-shared.interface';
import { ModalService } from '../../../function/ui/modal/modal.service';
import { AdminGroupMenuSettingModalComponent } from '../../../function/admin-group/component/admin-group-menu-setting-modal/admin-group-menu-setting-modal.component';
import { AdminGroupSitemapSettingModalComponent } from '../../../function/admin-group/component/admin-group-sitemap-setting-modal/admin-group-sitemap-setting-modal.component';

export class FarmPluginAdminGroup implements FarmPlugin {

  readonly funcId = 'admin_group';

  tableActionBtns: FarmPluginTableActionBtn[] = [
    {
      icon: '',
      fontSet: 'fontawasome',
      fontIcon: 'fa-tree',
      tooltip: '設定前台節點',
      click: (ev) => {
        const groupID = ev.row.columns[0]?.value;
        this.modalService.openComponent({
          component: AdminGroupSitemapSettingModalComponent,
          componentInitData: {
            groupID
          }
        }, true).subscribe();
      },
    },
    {
      icon: '',
      fontSet: 'fontawasome',
      fontIcon: 'fa-sitemap',
      tooltip: '設定後台功能',
      click: (ev) => {
        const groupID = ev.row.columns[0]?.value;
        this.modalService.openComponent({
          component: AdminGroupMenuSettingModalComponent,
          componentInitData: {
            groupID
          }
        }, true).subscribe();
      },
    }
  ];

  constructor(
    private modalService: ModalService,
  ) {

  }
}
