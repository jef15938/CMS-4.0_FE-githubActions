import { FarmCustomHandler, FarmTableActionBtn } from '../../../function/ui/farm-shared/farm-shared.interface';
import { ModalService } from '../../../function/ui/modal/modal.service';
import { FarmTableDataInfoModel } from '../../api/data-model/models/farm-table-data-info.model';
import { FarmTableInfoModel } from '../../api/data-model/models/farm-table-info.model';
import { Injector } from '@angular/core';
import { AdminGroupMenuSettingModalComponent } from '../../../function/admin-group/component/admin-group-menu-setting-modal/admin-group-menu-setting-modal.component';
import { AdminGroupSitemapSettingModalComponent } from '../../../function/admin-group/component/admin-group-sitemap-setting-modal/admin-group-sitemap-setting-modal.component';

export class FarmCustomHandlerAdminGroup implements FarmCustomHandler {

  readonly funcId = 'admin_group';

  tableActions: FarmTableActionBtn[] = [
    {
      icon: '',
      fontSet: 'fontawasome',
      fontIcon: 'fa-tree',
      tooltip: '設定前台節點',
      click: (row: FarmTableDataInfoModel, table: FarmTableInfoModel, injector: Injector) => {
        const modalService = injector.get(ModalService);
        const groupID = row.columns[0]?.value;
        modalService.openComponent({
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
      click: (row: FarmTableDataInfoModel) => {
        const groupID = row.columns[0]?.value;
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
