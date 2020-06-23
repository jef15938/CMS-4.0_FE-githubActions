import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ParamsError } from '@neux/core';
import { RestApiService } from './../../../neuxAPI/rest-api.service';
import { SiteMapGetResponse } from './../../../neuxAPI/bean/SiteMapGetResponse';
import { SiteGetResponse } from './../../../neuxAPI/bean/SiteGetResponse';
import { SiteInfo } from './../../../neuxAPI/bean/SiteInfo';
import { SiteMapNodeInfo } from './../../../neuxAPI/bean/SiteMapNodeInfo';
import { SiteMapInfo } from './../../../neuxAPI/bean/SiteMapInfo';

@Injectable({
  providedIn: 'root'
})
export class SitemapService {

  constructor(
    private restAPIService: RestApiService
  ) { }

  /**
   *
   *
   * @param {string} siteID required
   * @param {string} nodeName required
   * @param {string} metaTitle required
   * @param {string} layoutId optional
   * @param {string} parentId optional
   * @param {string} nodeType optional
   * @param {string} contentPath optional
   * @param {string} urlType optional
   * @param {string} urlLinkNodeId optional
   * @param {string} url optional
   * @param {string} urlBlank optional
   * @param {string} metaDescription optional
   * @param {string} metaKeyword optional
   * @param {string} metaImage optional
   * @returns
   * @memberof SitemapService
   */
  createSiteNode(
    siteID: string, nodeName: string, metaTitle: string,
    optional?: {
      layoutId?: string, parentId?: string, nodeType?: string, contentPath?: string,
      urlType?: string, urlLinkNodeId?: string, url?: string, urlBlank?: string,
      metaDescription?: string, metaKeyword?: string, metaImage?: string,
    }
  ) {
    if (!siteID) { throw new ParamsError('siteID', 'createSiteNode', 'string', siteID); }
    if (!nodeName) { throw new ParamsError('nodeName', 'createSiteNode', 'string', nodeName); }
    // if (!metaTitle) { throw new ParamsError('metaTitle', 'createSiteNode', 'string', metaTitle); }

    const requestBody: { [k: string]: any } = {
      node_name: nodeName,
      meta_title: metaTitle,
    };

    if (optional) {
      for (const key of Object.keys(optional)) {
        requestBody[key] = optional[key];
      }
    }

    return this.restAPIService.dispatchRestApi('PostUserSiteMapBySiteID', { siteID, requestBody });
  }

  /**
   *
   *
   * @param {string} nodeID
   * @returns
   * @memberof SitemapService
   */
  deleteUserSiteMap(nodeID: string) {
    if (!nodeID) {
      throw new ParamsError('nodeID', 'deleteUserSiteMap', 'string', nodeID);
    }
    return this.restAPIService.dispatchRestApi('DeleteUserSiteMapByNodeID', { nodeID });
  }

  /**
   *
   * @param {string} siteID
   * @returns
   * @memberof SitemapService
   */
  getCMSSiteMap(siteID: string) {
    return this.restAPIService.dispatchRestApi('GetCMSSiteMapBySiteID', { siteID }).pipe(
      map((res: SiteMapGetResponse) => res.datas)
    );
  }

  /**
   *
   * @param {string} siteID
   * @returns
   * @memberof SitemapService
   */
  getUserSiteMapNodes(siteID: string) {
    return this.restAPIService.dispatchRestApi('GetSiteBySiteID', { siteID }).pipe(
      map((res: SiteMapGetResponse) => res.datas)
    );
  }

  /**
   *
   * @param {string} siteID
   * @param {string} nodeID
   * @returns
   * @memberof SitemapService
   */
  getUserSiteMapNodeByNodeId(siteID: string, nodeID: string): Observable<SiteMapNodeInfo> {
    return this.restAPIService.dispatchRestApi('GetSiteBySiteIDAndNodeID', { siteID, nodeID });
  }

  private findNodeByNodeID(sources: SiteMapInfo[], nodeID: string): SiteMapNodeInfo {
    if (!sources?.length || !nodeID) { return null; }

    const node = sources.find(s => s.node_id === nodeID);
    if (node) { return node as any; }

    return sources.map(s => this.findNodeByNodeID(s.children, nodeID)).find(s => s.node_id === nodeID);
  }

  /**
   *
   *
   * @param {string} nodeID required
   * @param {string} nodeName required
   * @param {string} nodeOrders required
   * @param {string} metaTitle required
   * @param {string} parentId optional
   * @param {string} contentPath optional
   * @param {string} urlType optional
   * @param {string} urlLinkNodeId optional
   * @param {string} url optional
   * @param {string} urlBlank optional
   * @param {string} metaDescription optional
   * @param {string} metaKeyword optional
   * @param {string} metaImage optional
   * @returns
   * @memberof SitemapService
   */
  updateSiteNode(
    nodeID: string, nodeName: string, nodeOrders: string, metaTitle: string,
    optional?: {
      parentId?: string, contentPath?: string,
      urlType?: string, urlLinkNodeId?: string, url?: string, urlBlank?: string,
      metaDescription?: string, metaKeyword?: string, metaImage?: string,
    }
  ) {
    if (!nodeID) { throw new ParamsError('nodeID', 'updateSiteNode', 'string', nodeID); }
    if (!nodeName) { throw new ParamsError('nodeName', 'updateSiteNode', 'string', nodeName); }
    if (!nodeOrders) { throw new ParamsError('nodeOrders', 'updateSiteNode', 'string', nodeOrders); }
    if (!metaTitle) { throw new ParamsError('metaTitle', 'updateSiteNode', 'string', metaTitle); }

    const params: { [k: string]: any } = {
      nodeID,
      requestBody: {
        node_name: nodeName,
        node_orders: nodeOrders,
        meta_title: metaTitle,
      }
    };

    if (optional) {
      for (const key of Object.keys(optional)) {
        params.requestBody[key] = optional[key];
      }
    }

    return this.restAPIService.dispatchRestApi('PutUserSiteMapByNodeID', params);
  }

  /**
   *
   * @returns
   * @memberof SitemapService
   */
  getSiteList(): Observable<SiteInfo[]> {
    return this.restAPIService.dispatchRestApi('GetSite', {}).pipe(
      map((res: SiteGetResponse) => res.datas)
    );
  }

}
