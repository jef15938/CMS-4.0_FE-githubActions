import { SiteMapInfoModel } from '../api/data-model/models/site-map-info.model';
import { SiteInfoModel } from '../api/data-model/models/site-info.model';

export class SitemapUtil {
  static findContentPathBySiteIdAndNodeId(sites: SiteInfoModel[], siteId: string, nodeId: string) {
    const site = (sites || []).find(s => s.siteId === siteId);
    if (site) {
      const node = SitemapUtil.findNodeByNodeIdFromSitemaps(site.siteMap, nodeId);
      if (node) {
        return node.contentPath;
      }
    }
    return '';
  }

  static findNodeByContentPathFromSitemaps(sources: SiteMapInfoModel[], contentPath: string): SiteMapInfoModel {
    if (!sources?.length) { return null; }
    const node = sources.find(n => n.contentPath === contentPath);
    if (node) { return node; }
    const children = sources.reduce((a, b) => a.concat(b.children || []), [] as SiteMapInfoModel[]);
    return SitemapUtil.findNodeByContentPathFromSitemaps(children, contentPath);
  }

  static findNodeByContentPathFromSites(sites: SiteInfoModel[], contentPath: string): SiteMapInfoModel {
    if (!sites) { return null; }
    return (sites || []).map(site => {
      return SitemapUtil.findNodeByContentPathFromSitemaps(site.siteMap || [], contentPath);
    }).filter(v => !!v).find(n => n.contentPath === contentPath);
  }

  static findNodeByNodeIdFromSitemaps(sources: SiteMapInfoModel[], nodeId: string): SiteMapInfoModel {
    if (!sources?.length) { return null; }
    const node = sources.find(n => n.nodeId === nodeId);
    if (node) { return node; }
    const children = sources.reduce((a, b) => a.concat(b.children || []), [] as SiteMapInfoModel[]);
    return SitemapUtil.findNodeByNodeIdFromSitemaps(children, nodeId);
  }

  static findNodeByNodeIdFromSites(sites: SiteInfoModel[], nodeId: string): SiteMapInfoModel {
    if (!sites) { return null; }
    return (sites || []).map(site => {
      return SitemapUtil.findNodeByContentPathFromSitemaps(site.siteMap || [], nodeId);
    }).filter(v => !!v).find(n => n.nodeId === nodeId);
  }

  static flattenNodes(
    source: SiteMapInfoModel[], level = 0, result: SiteMapInfoModel[] = [], parent?: SiteMapInfoModel
  ) {
    if (!source?.length) { return []; }
    source.forEach(node => {
      result.push(node);
      SitemapUtil.flattenNodes(node.children, level + 1, result, node);
    });
    return result;
  }
}
