import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ContentInfo, SitemapNode } from '../interface';
import * as CONTENT from './render.service.mock-data.json';
import { RestApiService } from '../api/neuxAPI/rest-api.service';
import { PageInfo } from '../interface/page-info.interface';
import { map } from 'rxjs/operators';
import { convertPageInfo, convertContentInfo, convertSitemapNode } from '../utils/object-converter';
import { PageInfoGetResponse } from '../api/neuxAPI/bean/PageInfoGetResponse';
import { ContentInfo as ApiContentInfo } from '../api/neuxAPI/bean/ContentInfo';


@Injectable({
  providedIn: 'root'
})
export class RenderService {

  constructor(
    private apiService: RestApiService
  ) { }

  /**
   * 依據page ID跟language取得PageInfo,若無語系,後台自動回預設語系
   *
   * @param {string} pageID
   * @param {string} [lang=null]
   * @returns {Observable<PageInfo>}
   * @memberof RenderService
   */
  getPageInfo(context: 'preview' | 'runtime', pageID: string, lang: string = null): Observable<PageInfo> {

    if (!!lang) {
      return (
        context === 'preview'
          ? this.apiService.dispatchRestApi('GetPreviewPageByPageIDAndLang', { pageID, lang })
          : this.apiService.dispatchRestApi('GetPageByPageIDAndLang', { pageID, lang })
      ).pipe(
        map((x: PageInfoGetResponse) => convertPageInfo(x))
      );
    }
    else {
      return (
        context === 'preview'
          ? this.apiService.dispatchRestApi('GetPreviewPageByPageID', { pageID })
          : this.apiService.dispatchRestApi('GetPageByPageID', { pageID })
      ).pipe(
        map((x: PageInfoGetResponse) => convertPageInfo(x))
      );
    }
  }

  /**
   * 依據content ID取得Content
   *
   * @param {string} contentID
   * @returns {Observable<ContentInfo>}
   * @memberof RenderService
   */
  getContentInfo(context: 'preview' | 'runtime', contentID: string): Observable<ContentInfo> {
    return (
      context === 'preview'
        ? this.apiService.dispatchRestApi('GetPreviewContentByContentID', { contentID })
        : this.apiService.dispatchRestApi('GetContentByContentID', { contentID })
    ).pipe(
      map((x: ApiContentInfo) => convertContentInfo(x))
    );
  }

  /**
   * 根據root node 跟language取得sitemap
   *
   * @param {string} root
   * @param {string} [lang=null]
   * @returns {Observable<any>}
   * @memberof RenderService
   */
  getSitemap(context: 'preview' | 'runtime', root: string, lang: string = null): Observable<SitemapNode> {
    let request: Observable<any>;
    if (!!lang) {
      request = context === 'preview'
        ? this.apiService.dispatchRestApi('GetPreviewSiteMapByNodeIdAndLang', { node_id: root, lang })
        : this.apiService.dispatchRestApi('GetSiteMapByNodeIdAndLang', { node_id: root, lang });
    }
    request = context === 'preview'
      ? this.apiService.dispatchRestApi('GetPreviewSiteMapByNodeId', { node_id: root })
      : this.apiService.dispatchRestApi('GetSiteMapByNodeId', { node_id: root });

    return request.pipe(
      map(x => convertSitemapNode(x)),
    );
  }

}
