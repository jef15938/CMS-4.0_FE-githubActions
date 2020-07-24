import { SiteMapNodeGetResponse } from '../../global/api/neuxAPI/bean/SiteMapNodeGetResponse';

export interface SiteMapUpdateInfo {
  siteMap: SiteMapNodeGetResponse;
  parentId: string;
  nodeOrder: string;
}
