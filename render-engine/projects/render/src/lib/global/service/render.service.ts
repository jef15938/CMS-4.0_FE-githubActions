import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ContentInfo } from '../interface';
import * as CONTENT from './render.service.mock-data.json';
import { RestApiService } from '../api/neuxAPI/rest-api.service';
import { PageInfo } from '../interface/page-info.interface';
import { map } from 'rxjs/operators';
import { convertPageInfo, convertContentInfo } from '../utils/object-converter';
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
  getPageInfo(pageID: string, lang: string = null): Observable<PageInfo> {

    if (!!lang) {
      return this.apiService.dispatchRestApi('GetPageByPageIDAndLang', { pageID, lang }).pipe(
        map((x: PageInfoGetResponse) => convertPageInfo(x))
      );
    }
    else {
      return this.apiService.dispatchRestApi('GetPageByPageID', { pageID }).pipe(
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
  getContentInfo(contentID: string): Observable<ContentInfo> {
    return this.apiService.dispatchRestApi('GetContentByContentID', { contentID }).pipe(
      map((x: ApiContentInfo) => convertContentInfo(x))
    );
  }

}
