import { ModelMapping, ModelMapper } from '@neux/core';
import { SitesResponse } from '../../neuxAPI/bean/SitesResponse';
import { SiteModel } from './site.model';
import { SiteMapGetResponseModel } from './site-map-get-response.model';

// @dynamic
@ModelMapping(
  SitesResponse, SitesResponseModel,
  (bean, model) => {
    model.sites = ModelMapper.mapArrayTo(SiteModel, bean.sites);
  }
)
export class SitesResponseModel {
  sites: SiteModel[];

  static findContentPathBySiteIdAndNodeId(sites: SitesResponseModel, siteId: string, nodeId: string) {
    const site = (sites?.sites || []).find(s => s.siteId === siteId);
    if (site) {
      const node = SitesResponseModel.findNodeByNodeId(site.siteMap, nodeId);
      if (node) {
        return node.contentPath;
      }
    }
    return '';
  }

  static findNodeByNodeId(sources: SiteMapGetResponseModel[], nodeId: string): SiteMapGetResponseModel {
    if (!sources?.length) { return null; }
    const node = sources.find(n => n.nodeId === nodeId);
    if (node) { return node; }
    const children = sources.reduce((a, b) => a.concat(b.children || []), [] as SiteMapGetResponseModel[]);
    return SitesResponseModel.findNodeByNodeId(children, nodeId);
  }
}
