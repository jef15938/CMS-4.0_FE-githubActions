import { ContentTemplateInfoModel } from '../api/data-model/models/content-template-info.model';

export interface DataSourceTemplateInfo extends ContentTemplateInfoModel {
  source: string;
}
