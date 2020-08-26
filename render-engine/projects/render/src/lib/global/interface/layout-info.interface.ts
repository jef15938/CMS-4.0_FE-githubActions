import { ContentTemplateInfoModel } from '../api/data-model/models/content-template-info.model';
import { SiteMapGetResponseModel } from '../api/data-model/models/site-map-get-response.model';

export interface LayoutInfo extends ContentTemplateInfoModel {
  children: ContentTemplateInfoModel[];
  attributes: {
    sitemap: SiteMapGetResponseModel
  };
}
