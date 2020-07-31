import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParamsError } from '@neux/core';
import { RestApiService } from '../../neuxAPI/rest-api.service';
import { ContentInfo } from '../../neuxAPI/bean/ContentInfo';
import { TemplateGetResponse } from '../../neuxAPI/bean/TemplateGetResponse';
import { LayoutInfo } from '../../neuxAPI/bean/LayoutInfo';
import { LayoutGetResponse } from '../../neuxAPI/bean/LayoutGetResponse';
import { map } from 'rxjs/operators';
import { ListContentDataSourceResponse } from '../../neuxAPI/bean/ListContentDataSourceResponse';
import { ContentDataSource } from '../../neuxAPI/bean/ContentDataSource';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(
    private restAPIService: RestApiService
  ) { }

  /**
   *
   *
   * @param {string} contentID // SiteMapGetResponse.layout_id
   * @returns
   * @memberof ContentService
   */
  getContentByContentID(contentID: string): Observable<ContentInfo> {
    if (!contentID) {
      throw new ParamsError('contentID', 'getContentByContentID', 'string', contentID);
    }
    return this.restAPIService.dispatchRestApi('GetContentByContentID', { contentID });
  }

  /**
   *
   *
   * @returns
   * @memberof ContentService
   */
  getLayout(): Observable<LayoutInfo[]> {
    return this.restAPIService.dispatchRestApi<LayoutGetResponse>('GetLayout', null).pipe(map(_ => _.datas));
  }

  /**
   *
   *
   * @param {string} controlID // SiteMapGetResponse.layout_id
   * @returns
   * @memberof ContentService
   */
  getTemplateByControlID(controlID: string): Observable<TemplateGetResponse> {
    if (!controlID) {
      throw new ParamsError('controlID', 'getTemplateByControlID', 'string', controlID);
    }
    return this.restAPIService.dispatchRestApi('GetTemplateByControlID', { controlID });
  }

  /**
   *
   *
   * @param {string} contentID // SiteMap:nodeID
   * @param {ContentInfo} contentInfo
   * @returns
   * @memberof ContentService
   */
  updateContent(contentID: string, contentInfo: ContentInfo): Observable<any> {
    if (!contentID) { throw new ParamsError('contentID', 'updateContent', 'string', contentID); }
    if (!contentInfo) { throw new ParamsError('contentInfo', 'updateContent', 'ContentInfo', contentInfo); }

    const params: { [k: string]: any } = {
      contentID,
      requestBody: contentInfo,
    };

    return this.restAPIService.dispatchRestApi('PutContentByContentID', params);
  }


  /**
   *
   *
   * @param {string} typeID // SiteMapGetResponse.layout_id
   * @returns
   * @memberof ContentService
   */
  getContentDataSourceByTypeID(typeID: string): Observable<ContentDataSource[]> {
    if (!typeID) {
      throw new ParamsError('typeID', 'getContentDataSourceByTypeID', 'string', typeID);
    }
    return this.restAPIService.dispatchRestApi<ListContentDataSourceResponse>('GetContentDataSourceByTypeID', { typeID })
      .pipe(map(res => res.datas));
  }
}
