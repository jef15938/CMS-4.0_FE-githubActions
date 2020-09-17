import { ValidateNested } from 'class-validator';
import { SiteMapGetResponse } from '../../neuxAPI/bean/SiteMapGetResponse';
import { ModelMapping, ModelMapper } from '@neux/core';
import { SiteInfoModel } from './site-info.model';
import { SiteMapInfoModel } from './site-map-info.model';

// @dynamic
@ModelMapping(
  SiteMapGetResponse, SiteMapGetResponseModel,
  (bean, model) => {
    model.sites = ModelMapper.mapArrayTo(SiteInfoModel, bean.sites);
  }
)
export class SiteMapGetResponseModel {

  @ValidateNested()
  public sites: Array<SiteInfoModel>;

  static findContentPathBySiteIdAndNodeId(sites: SiteMapGetResponseModel, siteId: string, nodeId: string) {
    const site = (sites?.sites || []).find(s => s.siteId === siteId);
    if (site) {
      const node = SiteMapGetResponseModel.findNodeByNodeId(site.siteMap, nodeId);
      if (node) {
        return node.contentPath;
      }
    }
    return '';
  }

  static findNodeByNodeId(sources: SiteMapInfoModel[], nodeId: string): SiteMapInfoModel {
    if (!sources?.length) { return null; }
    const node = sources.find(n => n.nodeId === nodeId);
    if (node) { return node; }
    const children = sources.reduce((a, b) => a.concat(b.children || []), [] as SiteMapInfoModel[]);
    return SiteMapGetResponseModel.findNodeByNodeId(children, nodeId);
  }
}
