import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ParamsError } from '@neux/core';
import { RestApiService } from '../../neuxAPI/rest-api.service';
import { SiteMapGetResponse } from '../../neuxAPI/bean/SiteMapGetResponse';
import { SiteGetResponse } from '../../neuxAPI/bean/SiteGetResponse';
import { SiteInfo } from '../../neuxAPI/bean/SiteInfo';
import { SiteMapNodeGetResponse } from '../../neuxAPI/bean/SiteMapNodeGetResponse';
import { UserSiteMapPutRequest } from '../../neuxAPI/bean/UserSiteMapPutRequest';
import { SitemapAuditingRequest } from '../../neuxAPI/bean/SitemapAuditingRequest';
import { PreviewInfo } from '../../neuxAPI/bean/PreviewInfo';
import { SiteNodeDetailInfo } from '../../neuxAPI/bean/SiteNodeDetailInfo';

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
  getCMSSiteMap(siteID: string): Observable<SiteMapGetResponse[]> {
    return this.restAPIService.dispatchRestApi('GetCMSSiteMapBySiteID', { siteID });
  }

  /**
   *
   * @param {string} siteID
   * @returns
   * @memberof SitemapService
   */
  getUserSiteMapNodes(siteID: string): Observable<SiteMapGetResponse[]> {
    return this.restAPIService.dispatchRestApi<SiteMapGetResponse>('GetSiteBySiteID', { siteID }).pipe(map(res => [res]));
  }

  /**
   *
   * @param {string} siteID
   * @param {string} nodeID
   * @returns
   * @memberof SitemapService
   */
  getUserSiteMapNodeByNodeId(siteID: string, nodeID: string): Observable<SiteMapNodeGetResponse> {
    return this.restAPIService.dispatchRestApi('GetSiteBySiteIDAndNodeID', { siteID, nodeID });
  }

  private findNodeByNodeID(sources: SiteMapGetResponse[], nodeID: string): SiteMapNodeGetResponse {
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
    nodeID: string, details: SiteNodeDetailInfo[],
    optional?: {
      parent_id?: string, content_path?: string,
      url_type?: string, url_link_node_id?: string, url?: string, url_blank?: string,
    }
  ) {
    if (!nodeID) { throw new ParamsError('nodeID', 'updateSiteNode', 'string', nodeID); }

    const requestBody: UserSiteMapPutRequest = {
      parent_id: optional?.parent_id,
      content_path: optional?.content_path,
      url_type: optional?.url_type,
      url_link_node_id: optional?.url_link_node_id,
      url: optional?.url,
      url_blank: optional?.url_blank,
      details
    };

    const params: { [k: string]: any } = {
      nodeID,
      requestBody,
    };

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

  /**
   *
   * @returns
   * @memberof SitemapService
   */
  auditingSitemap(nodeId: string, startTime: string, endTime: string, memo: string, siteId: string) {
    if (!nodeId) { throw new ParamsError('nodeId', 'auditingSitemap', 'string', nodeId); }
    if (!startTime) { throw new ParamsError('startTime', 'auditingSitemap', 'string', startTime); }
    if (!endTime) { throw new ParamsError('endTime', 'auditingSitemap', 'string', endTime); }
    if (!siteId) { throw new ParamsError('siteId', 'auditingSitemap', 'string', siteId); }
    if (!memo) { throw new ParamsError('memo', 'auditingSitemap', 'string', memo); }

    const requestBody: SitemapAuditingRequest = {
      start_time: startTime,
      end_time: endTime,
      site_id: siteId,
      memo,
    };

    const params: { [k: string]: any } = {
      nodeId,
      requestBody,
    };

    return this.restAPIService.dispatchRestApi('PostSitemapAuditingByNodeId', params);
  }

  /**
   *
   *
   * @param {string} nodeID
   * @returns
   * @memberof SitemapService
   */
  getPreviewInfo(nodeID: string, languageID?: string): Observable<PreviewInfo> {
    if (!nodeID) { throw new ParamsError('nodeID', 'getPreviewInfo', 'string', nodeID); }
    return this.restAPIService.dispatchRestApi<PreviewInfo>('GetSitemapPreviewByNodeID', { nodeID, languageID });
  }

}
