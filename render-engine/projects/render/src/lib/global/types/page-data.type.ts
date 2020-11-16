import { PageInfoGetResponseModel } from '../api/data-model/models/page-info-get-response.model';
import { ContentInfoModel } from '../api/data-model/models/content-info.model';
import { SiteMapGetResponseModel } from '../api/data-model/models/site-map-get-response.model';
import { SiteMapInfoModel } from '../api/data-model/models/site-map-info.model';

export type PageData = {
  pageNode: SiteMapInfoModel;
  pageInfo: PageInfoGetResponseModel;
  sitemap: SiteMapGetResponseModel;
  contentInfo: ContentInfoModel;
};
