import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestApiService } from '../api/neuxAPI/rest-api.service';
import { PageInfoGetResponse } from '../api/neuxAPI/bean/PageInfoGetResponse';
import { PageInfoGetResponseModel } from '../api/data-model/models/page-info-get-response.model';
import { ModelMapper } from '@neux/core';
import { ContentInfoModel } from '../api/data-model/models/content-info.model';
import { ContentInfo } from '../api/neuxAPI/bean/ContentInfo';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ContextApiNameFactory, ApiContext } from '../api/context-api-name-factory';
import { plainToClass } from 'class-transformer';
import { SitesResponse } from '../api/neuxAPI/bean/SitesResponse';
import { SitesResponseModel } from '../api/data-model/models/sites-response.model';

@Injectable({
  providedIn: 'root'
})
export class RenderService {

  constructor(
    private apiService: RestApiService,
    private httpClient: HttpClient,
  ) { }

  /**
   * 依據page ID跟language取得PageInfo,若無語系,後台自動回預設語系
   *
   * @param {string} pageID
   * @param {string} [lang=null]
   * @returns {Observable<PageInfo>}
   * @memberof RenderService
   */
  getPageInfo(context: ApiContext, pageID: string, lang: string = null): Observable<PageInfoGetResponseModel> {

    const dispatch = !!lang
      ? this.apiService.dispatchRestApi<PageInfoGetResponse>(ContextApiNameFactory.GetPageByPageIDAndLang(context), { pageID, lang })
      : this.apiService.dispatchRestApi<PageInfoGetResponse>(ContextApiNameFactory.GetPageByPageID(context), { pageID })
      ;

    return dispatch.pipe(
      ModelMapper.rxMapModelTo(PageInfoGetResponseModel),
    );
  }

  /**
   * 依據content ID取得Content
   *
   * @param {string} contentID
   * @returns {Observable<ContentInfo>}
   * @memberof RenderService
   */
  getContentInfo(context: ApiContext, contentID: string): Observable<ContentInfoModel> {
    return (
      context === 'preview'
        ? this.apiService.dispatchRestApi<ContentInfo>('GetPreviewContentByContentID', { contentID })
        : this.apiService.dispatchRestApi<ContentInfo>('GetContentByContentID', { contentID })
    ).pipe(
      ModelMapper.rxMapModelTo(ContentInfoModel),
    );
  }

  getSitemapJson(): Observable<SitesResponse> {
    return this.httpClient.get<SitesResponse>('./sitemap.json').pipe(
      map(res => plainToClass(SitesResponse, res)),
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
  getSitemap(context: ApiContext): Observable<SitesResponseModel> {

    const dispatch = context === 'runtime'
      ? this.getSitemapJson()
      : this.apiService.dispatchRestApi<SitesResponse>(ContextApiNameFactory.GetSiteMapByNodeId(context), {})
      ;

    return dispatch.pipe(
      ModelMapper.rxMapModelTo(SitesResponseModel),
    );
  }

}
