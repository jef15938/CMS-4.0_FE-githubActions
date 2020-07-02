import { TemplateInfo } from './template-info.interface';
import { TabInfo } from './tab-info.interface';

export interface TabTemplateInfo extends TemplateInfo {
  tabList: TabInfo[];
}
