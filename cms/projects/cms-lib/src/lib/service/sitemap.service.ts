import { Injectable } from '@angular/core';
import { RestApiService } from '../neuxAPI/rest-api.service';
import { ParamsError } from '@neux/core';
import { SiteMapGetResponse } from '../neuxAPI/bean/SiteMapGetResponse';
import { map } from 'rxjs/operators';

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
    if (!metaTitle) { throw new ParamsError('metaTitle', 'createSiteNode', 'string', metaTitle); }

    const params: { [k: string]: any } = {
      siteID,
      node_name: nodeName,
      meta_title: metaTitle,
    };

    if (optional) {
      for (let key of Object.keys(optional)) {
        params[key] = optional[key];
      }
    }

    return this.restAPIService.dispatchRestApi('PostUserSiteMapBySiteID', params);
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
    return this.restAPIService.dispatchRestApi<SiteMapGetResponse>('GetCMSSiteMapBySiteID', { siteID }).pipe(
      map(res => res.datas)
    );
  }

  /**
   *
   * @param {string} siteID
   * @returns
   * @memberof SitemapService
   */
  getUserSiteMap(siteID: string) {
    return this.restAPIService.dispatchRestApi<SiteMapGetResponse>('GetUserSiteMapBySiteID', { siteID }).pipe(
      map(res => res.datas)
    );
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
      node_name: nodeName,
      node_orders: nodeOrders,
      meta_title: metaTitle,
    };

    if (optional) {
      for (let key of Object.keys(optional)) {
        params[key] = optional[key];
      }
    }

    return this.restAPIService.dispatchRestApi('PostUserSiteMapBySiteID', params);
  }

}
