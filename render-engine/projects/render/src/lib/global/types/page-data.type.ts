import { PageInfoGetResponseModel } from '../api/data-model/models/page-info-get-response.model';
import { ContentInfoModel } from '../api/data-model/models/content-info.model';
import { SiteMapGetResponseModel } from '../api/data-model/models/site-map-get-response.model';

export type PageData = {
  pageID: string;
  pageInfo: PageInfoGetResponseModel;
  sitemap: SiteMapGetResponseModel;
  contentInfo: ContentInfoModel;
};
