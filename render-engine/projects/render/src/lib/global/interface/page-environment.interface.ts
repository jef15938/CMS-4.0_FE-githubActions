import { SiteMapInfoModel } from '../api/data-model/models/site-map-info.model';
import { SiteInfoModel } from '../api/data-model/models/site-info.model';

export interface RenderedPageEnvironment {
  pageSites: SiteInfoModel[];
  pageNode: SiteMapInfoModel;
  pageLang: string;
  isBrowser: boolean;
  isRuntime: boolean;
}
