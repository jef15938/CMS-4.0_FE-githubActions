import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParamsError } from '@neux/core';
import { RestApiService } from '../../neuxAPI/rest-api.service';
import { ContentInfo } from '../../neuxAPI/bean/ContentInfo';
import { TemplateGetResponse } from '../../neuxAPI/bean/TemplateGetResponse';
import { LayoutGetResponse } from '../../neuxAPI/bean/LayoutGetResponse';
import { map } from 'rxjs/operators';
import { ListContentDataSourceResponse } from '../../neuxAPI/bean/ListContentDataSourceResponse';
import { ListContentVersionResponse } from '../../neuxAPI/bean/ListContentVersionResponse';
import { LayoutInfoModel } from '../../data-model/models/layout-info.model';
import { ModelMapper } from '../../data-model/model-mapper';
import { LayoutGetResponseModel } from '../../data-model/models/layout-get-response.model';
import { ContentDataSourceModel } from '../../data-model/models/content-data-source.model';
import { ListContentDataSourceResponseModel } from '../../data-model/models/list-content-data-source-response.model';
import { ContentVersionInfoModel } from '../../data-model/models/content-version-info.model';
import { ListContentVersionResponseModel } from '../../data-model/models/list-content-version-response.model';
import { TemplateGetResponseModel } from '../../data-model/models/template-get-response.model';
import { ContentInfoModel } from '../../data-model/models/content-info.model';
import { plainToClass } from 'class-transformer';

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
   * @param {string} contentID // SiteMapNodeGetResponse.content_id
   * @returns
   * @memberof ContentService
   */
  getContentById(id: string, version?: number): Observable<ContentInfoModel> {
    if (!id) {
      throw new ParamsError('id', 'getContentById', 'string', id);
    }
    return this.restAPIService.dispatchRestApi<ContentInfo>('GetContentById', { id, version }).pipe(
      ModelMapper.rxMapModelTo(ContentInfoModel),
    );
  }

  /**
   *
   *
   * @returns
   * @memberof ContentService
   */
  getLayout(): Observable<LayoutInfoModel[]> {
    return this.restAPIService.dispatchRestApi<LayoutGetResponse>('GetLayout', null).pipe(
      ModelMapper.rxMapModelTo(LayoutGetResponseModel),
      map(res => res.datas)
    );
  }

  /**
   *
   *
   * @param {string} controlID // SiteMapGetResponse.layout_id
   * @returns
   * @memberof ContentService
   */
  getTemplateByControlID(controlID: string): Observable<TemplateGetResponseModel> {
    if (!controlID) {
      throw new ParamsError('controlID', 'getTemplateByControlID', 'string', controlID);
    }
    return this.restAPIService.dispatchRestApi<TemplateGetResponse>('GetTemplateByControlID', { controlID }).pipe(
      ModelMapper.rxMapModelTo(TemplateGetResponseModel),
    );
  }

  convertContentInfoJsonToContentInfoModel(contentInfoJson: ContentInfo): ContentInfoModel {
    if (!contentInfoJson) { return null; }
    const contentInfo = plainToClass(ContentInfo, contentInfoJson);
    return ModelMapper.mapModelTo(ContentInfoModel, contentInfo);
  }

  convertContentInfoModelToContentInfo(contentInfoModel: ContentInfoModel): ContentInfo {
    if (!contentInfoModel) { return contentInfoModel as any; }
    const contentInfoModelJsonString = JSON.stringify(contentInfoModel);
    const regexLanguageId = new RegExp(/languageId/g);
    const regexLanguageName = new RegExp(/languageName/g);
    const resultString = contentInfoModelJsonString
      .replace(regexLanguageId, 'language_id')
      .replace(regexLanguageName, 'language_name');
    return JSON.parse(resultString);
  }

  /**
   *
   *
   * @param {string} id // SiteMapNodeGetResponse.content_id
   * @param {ContentInfo} contentInfo
   * @returns
   * @memberof ContentService
   */
  updateContent(id: string, contentInfo: ContentInfo): Observable<any> {
    if (!id) { throw new ParamsError('id', 'updateContent', 'string', id); }
    if (!contentInfo) { throw new ParamsError('contentInfo', 'updateContent', 'ContentInfo', contentInfo); }

    const params: { [k: string]: any } = {
      id,
      requestBody: contentInfo,
    };

    return this.restAPIService.dispatchRestApi('PutContentById', params);
  }


  /**
   *
   *
   * @param {string} typeID
   * @returns
   * @memberof ContentService
   */
  getContentDataSourceByTypeID(typeID: string): Observable<ContentDataSourceModel[]> {
    if (!typeID) {
      throw new ParamsError('typeID', 'getContentDataSourceByTypeID', 'string', typeID);
    }
    return this.restAPIService.dispatchRestApi<ListContentDataSourceResponse>('GetContentDataSourceByTypeID', { typeID }).pipe(
      ModelMapper.rxMapModelTo(ListContentDataSourceResponseModel),
      map(res => res.datas)
    );
  }

  /**
   *
   *
   * @param {string} contentID // SiteMapNodeGetResponse.content_id
   * @returns
   * @memberof ContentService
   */
  getContentVersionByContentID(contentID: string): Observable<ContentVersionInfoModel[]> {
    if (!contentID) {
      throw new ParamsError('contentID', 'getContentVersionByContentID', 'string', contentID);
    }
    return this.restAPIService.dispatchRestApi<ListContentVersionResponse>('GetContentVersionByContentID', { contentID }).pipe(
      ModelMapper.rxMapModelTo(ListContentVersionResponseModel),
      map(res => res.datas)
    );
  }
}
