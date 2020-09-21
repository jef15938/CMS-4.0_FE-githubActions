import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { ModelMapper } from '@neux/core';
import { RestApiService } from '../api/neuxAPI/rest-api.service';
import { PageInfoGetResponseModel } from '../api/data-model/models/page-info-get-response.model';
import { ContentInfoModel } from '../api/data-model/models/content-info.model';
import { ApiContext } from '../api/context-api-name-factory';
import { SiteMapGetResponseModel } from '../api/data-model/models/site-map-get-response.model';
import { SiteMapGetResponse } from '../api/neuxAPI/bean/SiteMapGetResponse';

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
      ? (
        context === 'runtime'
          ? this.apiService.GetPageInfoByLang({ page_id: pageID, lang })
          : this.apiService.GetPreviewPageInfoByLang({ page_id: pageID, lang })
      )
      : (
        context === 'runtime'
          ? this.apiService.GetPageInfo({ page_id: pageID })
          : this.apiService.GetPreviewPageInfo({ page_id: pageID })
      )
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
      context === 'runtime'
        ? this.apiService.GetContentInfo({ content_id: contentID })
        : this.apiService.GetPreviewContent({ content_id: contentID })
    ).pipe(
      ModelMapper.rxMapModelTo(ContentInfoModel),
    );
  }

  getSitemapJson(): Observable<SiteMapGetResponse> {
    return this.httpClient.get<SiteMapGetResponse>('./sitemap.json').pipe(
      map(res => plainToClass(SiteMapGetResponse, res)),
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
  getSitemap(context: ApiContext): Observable<SiteMapGetResponseModel> {

    const dispatch = context === 'runtime'
      ? this.getSitemapJson()
      : (
        context === 'batchSSR' ? this.apiService.GetSiteMap({}) : this.apiService.GetPreviewSiteMap({})
      )
      ;

    return dispatch.pipe(
      ModelMapper.rxMapModelTo(SiteMapGetResponseModel),
    );
  }

}
