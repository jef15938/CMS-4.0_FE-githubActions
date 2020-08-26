import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ParamsError } from '@neux/core';
import { RestApiService } from '../../neuxAPI/rest-api.service';
import { SiteMapGetResponse } from '../../neuxAPI/bean/SiteMapGetResponse';
import { SiteGetResponse } from '../../neuxAPI/bean/SiteGetResponse';
import { SiteMapNodeGetResponse } from '../../neuxAPI/bean/SiteMapNodeGetResponse';
import { UserSiteMapPutRequest } from '../../neuxAPI/bean/UserSiteMapPutRequest';
import { SitemapAuditingRequest } from '../../neuxAPI/bean/SitemapAuditingRequest';
import { PreviewInfo } from '../../neuxAPI/bean/PreviewInfo';
import { SiteNodeDetailInfo } from '../../neuxAPI/bean/SiteNodeDetailInfo';
import { ModelMapper } from '@neux/core';
import { PreviewInfoModel } from '../../data-model/models/preview-info.model';
import { SiteMapNodeGetResponseModel } from '../../data-model/models/site-map-node-get-response.model';
import { SiteInfoModel } from '../../data-model/models/site-info.model';
import { SiteGetResponseModel } from '../../data-model/models/site-get-response.model';
import { SiteMapGetResponseModel } from '../../data-model/models/site-map-get-response.model';
import { UserSiteMapPostRequestModel } from '../../data-model/models/user-sitemap-post-request.model';
import { UserSiteMapPostRequest } from '../../neuxAPI/bean/UserSiteMapPostRequest';
import { SiteNodeDetailInfoModel } from '../../data-model/models/site-node-detail-info.model';
import { UserSiteMapPutRequestModel } from '../../data-model/models/user-sitemap-put-request.model';

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
    siteID: string, userSiteMapPostRequestModel: UserSiteMapPostRequestModel
  ) {
    if (!siteID) { throw new ParamsError('siteID', 'createSiteNode', 'string', siteID); }
    // if (!metaTitle) { throw new ParamsError('metaTitle', 'createSiteNode', 'string', metaTitle); }

    const requestBody: UserSiteMapPostRequest = ModelMapper
      .map(UserSiteMapPostRequestModel, UserSiteMapPostRequest, userSiteMapPostRequestModel);

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
  getCMSSiteMap(siteID: string): Observable<SiteMapGetResponseModel[]> {
    return this.restAPIService.dispatchRestApi<SiteMapGetResponse>('GetSiteBySiteID', { siteID }).pipe(
      ModelMapper.rxMapModelTo(SiteMapGetResponseModel),
      map(res => [res])
    );
  }

  /**
   *
   * @param {string} siteID
   * @returns
   * @memberof SitemapService
   */
  getUserSiteMapNodes(siteID: string): Observable<SiteMapGetResponseModel[]> {
    return this.restAPIService.dispatchRestApi<SiteMapGetResponse>('GetUserSiteMapBySiteID', { siteID }).pipe(
      ModelMapper.rxMapModelTo(SiteMapGetResponseModel),
      map(res => [res])
    );
  }

  /**
   *
   * @param {string} siteID
   * @param {string} nodeID
   * @returns
   * @memberof SitemapService
   */
  getUserSiteMapNodeByNodeId(siteID: string, nodeID: string): Observable<SiteMapNodeGetResponseModel> {
    return this.restAPIService.dispatchRestApi<SiteMapNodeGetResponse>('GetSiteBySiteIDAndNodeID', { siteID, nodeID }).pipe(
      ModelMapper.rxMapModelTo(SiteMapNodeGetResponseModel),
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
    nodeID: string, details: SiteNodeDetailInfoModel[], userSiteMapPutRequestModel: UserSiteMapPutRequestModel
  ) {
    if (!nodeID) { throw new ParamsError('nodeID', 'updateSiteNode', 'string', nodeID); }

    const requestBody: UserSiteMapPutRequest = ModelMapper
      .map(UserSiteMapPutRequestModel, UserSiteMapPutRequest, userSiteMapPutRequestModel);

    requestBody.details = ModelMapper.mapArrayTo(SiteNodeDetailInfo, details);

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
  getSiteList(): Observable<SiteInfoModel[]> {
    return this.restAPIService.dispatchRestApi<SiteGetResponse>('GetSite', {}).pipe(
      ModelMapper.rxMapModelTo(SiteGetResponseModel),
      map(res => res.datas)
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
  getPreviewInfo(nodeID: string, languageID?: string): Observable<PreviewInfoModel> {
    if (!nodeID) { throw new ParamsError('nodeID', 'getPreviewInfo', 'string', nodeID); }
    return this.restAPIService.dispatchRestApi<PreviewInfo>('GetSitemapPreviewByNodeID', { nodeID, language_id: languageID }).pipe(
      ModelMapper.rxMapModelTo(PreviewInfoModel),
    );
  }

  /**
   *
   *
   * @param {string} nodeID required
   * @param {string} nodeOrder required
   * @param {string} parentID required
   * @returns
   * @memberof SitemapService
   */
  reOrderSiteNode(nodeID: string, parentID: string, nodeOrder: number) {
    if (!nodeID) { throw new ParamsError('nodeID', 'reOrderSiteNode', 'string', nodeID); }
    if (!parentID) { throw new ParamsError('parentID', 'reOrderSiteNode', 'string', parentID); }
    if (!nodeOrder && nodeOrder !== 0) { throw new ParamsError('nodeOrder', 'reOrderSiteNode', 'number', nodeOrder); }

    const requestBody = {};

    const params: { [k: string]: any } = {
      nodeID,
      parent_id: parentID,
      node_order: nodeOrder + 1, // 從 1 開始
      requestBody,
    };

    return this.restAPIService.dispatchRestApi('PutReOrderSiteMapByNodeID', params);
  }
}
