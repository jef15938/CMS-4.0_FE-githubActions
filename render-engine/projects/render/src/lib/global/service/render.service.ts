import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestApiService } from '../api/neuxAPI/rest-api.service';
import { PageInfoGetResponse } from '../api/neuxAPI/bean/PageInfoGetResponse';
import { PageInfoGetResponseModel } from '../api/data-model/models/page-info-get-response.model';
import { ModelMapper } from '@neux/core';
import { ContentInfoModel } from '../api/data-model/models/content-info.model';
import { SiteMapGetResponseModel } from '../api/data-model/models/site-map-get-response.model';
import { SiteMapGetResponse } from '../api/neuxAPI/bean/SiteMapGetResponse';
import { ContentInfo } from '../api/neuxAPI/bean/ContentInfo';

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
  getPageInfo(context: 'preview' | 'runtime', pageID: string, lang: string = null): Observable<PageInfoGetResponseModel> {

    if (!!lang) {
      return (
        context === 'preview'
          ? this.apiService.dispatchRestApi<PageInfoGetResponse>('GetPreviewPageByPageIDAndLang', { pageID, lang })
          : this.apiService.dispatchRestApi<PageInfoGetResponse>('GetPageByPageIDAndLang', { pageID, lang })
      ).pipe(
        ModelMapper.rxMapModelTo(PageInfoGetResponseModel),
      );
    }
    else {
      return (
        context === 'preview'
          ? this.apiService.dispatchRestApi<PageInfoGetResponse>('GetPreviewPageByPageID', { pageID })
          : this.apiService.dispatchRestApi<PageInfoGetResponse>('GetPageByPageID', { pageID })
      ).pipe(
        ModelMapper.rxMapModelTo(PageInfoGetResponseModel),
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
  getContentInfo(context: 'preview' | 'runtime', contentID: string): Observable<ContentInfoModel> {
    return (
      context === 'preview'
        ? this.apiService.dispatchRestApi<ContentInfo>('GetPreviewContentByContentID', { contentID })
        : this.apiService.dispatchRestApi<ContentInfo>('GetContentByContentID', { contentID })
    ).pipe(
      ModelMapper.rxMapModelTo(ContentInfoModel),
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
  getSitemap(context: 'preview' | 'runtime', root: string, lang: string = null): Observable<SiteMapGetResponseModel> {
    let request: Observable<any>;
    if (!!lang) {
      request = context === 'preview'
        ? this.apiService.dispatchRestApi<SiteMapGetResponse>('GetPreviewSiteMapByNodeIdAndLang', { node_id: root, lang })
        : this.apiService.dispatchRestApi<SiteMapGetResponse>('GetSiteMapByNodeIdAndLang', { node_id: root, lang });
    }
    request = context === 'preview'
      ? this.apiService.dispatchRestApi<SiteMapGetResponse>('GetPreviewSiteMapByNodeId', { node_id: root })
      : this.apiService.dispatchRestApi<SiteMapGetResponse>('GetSiteMapByNodeId', { node_id: root });

    return request.pipe(
      ModelMapper.rxMapModelTo(SiteMapGetResponseModel),
    );
  }

}
