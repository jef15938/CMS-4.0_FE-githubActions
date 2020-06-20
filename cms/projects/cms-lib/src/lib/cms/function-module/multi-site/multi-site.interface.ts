import { SiteMapNodeInfo } from '../../../neuxAPI/bean/SiteMapNodeInfo';

export interface SiteMapUpdateInfo {
  siteMap: SiteMapNodeInfo;
  parentId: string;
  nodeOrder: string;
}
