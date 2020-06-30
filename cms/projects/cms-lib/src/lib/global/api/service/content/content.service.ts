import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParamsError } from '@neux/core';
import { RestApiService } from '../../neuxAPI/rest-api.service';
import { ContentInfo } from '../../neuxAPI/bean/ContentInfo';
import { TemplateGetResponse } from '../../neuxAPI/bean/TemplateGetResponse';

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
   * @param {string} contentID // SiteMapInfo.layout_id
   * @returns
   * @memberof ContentService
   */
  getContentByContentID(contentID: string): Observable<ContentInfo> {
    if (!contentID) {
      throw new ParamsError('contentID', 'getContentByContentID', 'string', contentID);
    }
    return this.restAPIService.dispatchRestApi('GetContentByContentID', { contentID });;
  }

  /**
   *
   *
   * @param {string} controlID // SiteMapInfo.layout_id
   * @returns
   * @memberof ContentService
   */
  getTemplateByControlID(controlID: string): Observable<TemplateGetResponse> {
    if (!controlID) {
      throw new ParamsError('controlID', 'getTemplateByControlID', 'string', controlID);
    }
    return this.restAPIService.dispatchRestApi('GetTemplateByControlID', { controlID });;
  }
}
