import { PageInfoGetResponseModel } from '../api/data-model/models/page-info-get-response.model';
import { ContentInfoModel } from '../api/data-model/models/content-info.model';
import { SitesResponseModel } from '../api/data-model/models/sites-response.model';

export type PageData = {
  pageInfo: PageInfoGetResponseModel;
  sitemap: SitesResponseModel;
  contentInfo: ContentInfoModel;
};
