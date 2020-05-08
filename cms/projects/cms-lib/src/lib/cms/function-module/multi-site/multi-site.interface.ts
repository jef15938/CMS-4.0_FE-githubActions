import { SiteMapInfo } from '../../../neuxAPI/bean/SiteMapInfo';

export interface SiteMapUpdateInfo {
  siteMap: SiteMapInfo;
  parentId: string;
  nodeOrder: string;
}