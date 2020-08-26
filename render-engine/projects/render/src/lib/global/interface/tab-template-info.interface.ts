import { TabInfo } from './tab-info.interface';
import { ContentTemplateInfoModel } from '../api/data-model/models/content-template-info.model';

export interface TabTemplateInfo extends ContentTemplateInfoModel {
  tabList: TabInfo[];
}
