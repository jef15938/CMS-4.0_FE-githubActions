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

  static findNodeByContentPathFromSitemaps(sources: SiteMapInfoModel[], contentPath: string): SiteMapInfoModel {
    if (!sources?.length) { return null; }
    const node = sources.find(n => n.contentPath === contentPath);
    if (node) { return node; }
    const children = sources.reduce((a, b) => a.concat(b.children || []), [] as SiteMapInfoModel[]);
    return SiteMapGetResponseModel.findNodeByContentPathFromSitemaps(children, contentPath);
  }

  static findNodeByContentPathFromSites(sites: SiteInfoModel[], contentPath: string): SiteMapInfoModel {
    if (!sites) { return null; }
    return (sites || []).map(site => {
      return SiteMapGetResponseModel.findNodeByContentPathFromSitemaps(site.siteMap || [], contentPath);
    }).filter(v => !!v).find(n => n.contentPath === contentPath);
  }

  static flattenNodes(
    source: SiteMapInfoModel[], level = 0, result: SiteMapInfoModel[] = [], parent?: SiteMapInfoModel
  ) {
    if (!source?.length) { return []; }
    source.forEach(node => {
      result.push(node);
      this.flattenNodes(node.children, level + 1, result, node);
    });
    return result;
  }
}
