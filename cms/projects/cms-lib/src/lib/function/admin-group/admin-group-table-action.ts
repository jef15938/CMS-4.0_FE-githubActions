import { FarmTableAction } from '../ui';
import { AdminGroupSitemapSettingActionBtn } from './action/admin-group-sitemap-setting-action-btn';
import { AdminGroupMenuSettingActionBtn } from './action/admin-group-menu-setting-action-btn';

export const AdminGroupTableAction: FarmTableAction = {
  funcID: 'admin_group',
  btns: [
    AdminGroupSitemapSettingActionBtn,
    AdminGroupMenuSettingActionBtn,
  ]
};
