import { FarmTableActionBtn, ModalService } from '../../ui';
import { CmsFarmTableDataInfo, CmsFarmTableInfo } from '../../../global/model';
import { Injector } from '@angular/core';
import { AdminGroupMenuSettingModalComponent } from '../component/admin-group-menu-setting-modal/admin-group-menu-setting-modal.component';

export const AdminGroupMenuSettingActionBtn: FarmTableActionBtn = {
  icon: '',
  fontSet: 'fontawasome',
  fontIcon: 'fa-sitemap',
  click: (row: CmsFarmTableDataInfo, table: CmsFarmTableInfo, injector: Injector) => {
    const modalService = injector.get(ModalService);
    modalService.openComponent({
      component: AdminGroupMenuSettingModalComponent,
    }).subscribe();
  },
};
