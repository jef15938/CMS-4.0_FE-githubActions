import { SiteMapNodeInfo } from '../../global/api/neuxAPI/bean/SiteMapNodeInfo';

export interface SiteMapUpdateInfo {
  siteMap: SiteMapNodeInfo;
  parentId: string;
  nodeOrder: string;
}
