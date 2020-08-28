import { FarmTableActionBtn, ModalService } from '../../ui';
import { Injector } from '@angular/core';
import { AdminGroupSitemapSettingModalComponent } from '../component/admin-group-sitemap-setting-modal/admin-group-sitemap-setting-modal.component';
import { FarmTableDataInfoModel } from '../../../global/api/data-model/models/farm-table-data-info.model';
import { FarmTableInfoModel } from '../../../global/api/data-model/models/farm-table-info.model';

export const AdminGroupSitemapSettingActionBtn: FarmTableActionBtn = {
  icon: '',
  fontSet: 'fontawasome',
  fontIcon: 'fa-tree',
  tooltip: '設定前台節點',
  class: 'text-confirm',
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
};
