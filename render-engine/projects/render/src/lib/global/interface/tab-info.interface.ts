import { ContentTemplateInfoModel } from '../api/data-model/models/content-template-info.model';
import { ContentFieldInfoModel } from '../api/data-model/models/content-field-info.model';

export interface TabInfo extends ContentFieldInfoModel {
  tabId: string;
  children: ContentTemplateInfoModel[];
}
