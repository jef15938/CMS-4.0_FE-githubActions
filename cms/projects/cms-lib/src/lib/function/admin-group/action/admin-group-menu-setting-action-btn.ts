import { FarmTableActionBtn, ModalService } from '../../ui';
import { Injector } from '@angular/core';
import { AdminGroupMenuSettingModalComponent } from '../component/admin-group-menu-setting-modal/admin-group-menu-setting-modal.component';
import { FarmTableDataInfoModel } from '../../../global/api/data-model/models/farm-table-data-info.model';
import { FarmTableInfoModel } from '../../../global/api/data-model/models/farm-table-info.model';

export const AdminGroupMenuSettingActionBtn: FarmTableActionBtn = {
  icon: '',
  fontSet: 'fontawasome',
  fontIcon: 'fa-sitemap',
  click: (row: FarmTableDataInfoModel, table: FarmTableInfoModel, injector: Injector) => {
    const modalService = injector.get(ModalService);
    const groupID = row.columns[0]?.value;
    modalService.openComponent({
      component: AdminGroupMenuSettingModalComponent,
      componentInitData: {
        groupID
      }
    }, true).subscribe();
  },
};
