import { ContentTemplateInfo } from './content-template-info.interface';
import { TabInfo } from './tab-info.interface';

export interface TabTemplateInfo extends ContentTemplateInfo {
  tabList: TabInfo[];
}
