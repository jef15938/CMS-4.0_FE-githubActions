import { FarmTableActionBtn, ModalService } from '../../ui';
import { CmsFarmTableDataInfo, CmsFarmTableInfo } from '../../../global/model';
import { Injector } from '@angular/core';
import { AdminGroupSitemapSettingModalComponent } from '../component/admin-group-sitemap-setting-modal/admin-group-sitemap-setting-modal.component';

export const AdminGroupSitemapSettingActionBtn: FarmTableActionBtn = {
  icon: '',
  fontSet: 'fontawasome',
  fontIcon: 'fa-tree',
  click: (row: CmsFarmTableDataInfo, table: CmsFarmTableInfo, injector: Injector) => {
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
