import { PageInfoGetResponseModel } from '../api/data-model/models/page-info-get-response.model';
import { SiteMapGetResponseModel } from '../api/data-model/models/site-map-get-response.model';
import { ContentInfoModel } from '../api/data-model/models/content-info.model';

export type PageData = {
  pageInfo: PageInfoGetResponseModel;
  sitemap: SiteMapGetResponseModel;
  contentInfo: ContentInfoModel;
};
