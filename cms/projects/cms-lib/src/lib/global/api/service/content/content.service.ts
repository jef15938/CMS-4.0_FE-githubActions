import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { ParamsError, ModelMapper } from '@neux/core';
import { RestApiService } from '../../neuxAPI/rest-api.service';
import { ContentInfo } from '../../neuxAPI/bean/ContentInfo';
import { map } from 'rxjs/operators';
import { LayoutInfoModel } from '../../data-model/models/layout-info.model';
import { LayoutGetResponseModel } from '../../data-model/models/layout-get-response.model';
import { ListContentDataSourceResponseModel } from '../../data-model/models/list-content-data-source-response.model';
import { ContentVersionInfoModel } from '../../data-model/models/content-version-info.model';
import { ListContentVersionResponseModel } from '../../data-model/models/list-content-version-response.model';
import { TemplateGetResponseModel } from '../../data-model/models/template-get-response.model';
import { ContentInfoModel } from '../../data-model/models/content-info.model';
import { ContentServiceError, CmsErrorHandler } from '../../../error-handling';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  error = new ContentServiceError();

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
    return this.restAPIService.GetContent({ id, version }).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('getContentById')),
      ModelMapper.rxMapModelTo(ContentInfoModel),
    );
  }

  /**
   *
   *
   * @param {string} siteId
   * @param {string} nodeId
   * @returns
   * @memberof ContentService
   */
  getSitemapContentBySiteIdAndNodeId(siteId: string, nodeId: string): Observable<ContentInfoModel> {
    if (!siteId) {
      throw new ParamsError('siteId', 'getSitemapContentBySiteIdAndNodeId', 'string', siteId);
    }
    if (!nodeId) {
      throw new ParamsError('siteId', 'getSitemapContentBySiteIdAndNodeId', 'string', nodeId);
    }
    return this.restAPIService.GetSitemapContent({ siteId, nodeId }).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('getSitemapContentBySiteIdAndNodeId')),
      ModelMapper.rxMapModelTo(ContentInfoModel),
    );
  }

  /**
   *
   *
   * @param {string} siteId
   * @param {string} nodeId
   * @returns
   * @memberof ContentService
   */
  getSitemapContentUnlockBySiteIdAndNodeId(siteId: string, nodeId: string): Observable<any> {
    if (!siteId) {
      throw new ParamsError('siteId', 'getSitemapContentUnlockBySiteIdAndNodeId', 'string', siteId);
    }
    if (!nodeId) {
      throw new ParamsError('siteId', 'getSitemapContentUnlockBySiteIdAndNodeId', 'string', nodeId);
    }
    return this.restAPIService.SitemapContentUnlock({ siteId, nodeId });
  }

  /**
   *
   *
   * @returns
   * @memberof ContentService
   */
  getLayout(): Observable<LayoutInfoModel[]> {
    return this.restAPIService.GetLayout({}).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('getLayout')),
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
    return this.restAPIService.GetTemplate({ controlID }).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('getTemplateByControlID')),
      ModelMapper.rxMapModelTo(TemplateGetResponseModel),
    );
  }

  convertContentInfoJsonToContentInfoModel(contentInfoJson: ContentInfo): ContentInfoModel {
    if (!contentInfoJson) { return null; }
    const contentInfo = plainToClass(ContentInfo, contentInfoJson);
    return ModelMapper.mapModelTo(ContentInfoModel, contentInfo);
  }

  convertContentInfoModelToContentInfo(contentInfoModel: ContentInfoModel): ContentInfo {
    try {
      if (!contentInfoModel) { return contentInfoModel as any; }
      const contentInfoModelJsonString = JSON.stringify(contentInfoModel);
      const regexLanguageId = new RegExp(/languageId/g);
      const regexLanguageName = new RegExp(/languageName/g);
      const resultString = contentInfoModelJsonString
        .replace(regexLanguageId, 'language_id')
        .replace(regexLanguageName, 'language_name');
      return JSON.parse(resultString);
    } catch (error) {
      CmsErrorHandler.throwAndShow(error, 'ContentService.convertContentInfoModelToContentInfo()', '資料解析錯誤');
    }
    return null;
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

    const params = {
      id,
      requestBody: contentInfo,
    };

    return this.restAPIService.UpdateContent(params).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('updateContent')),
    );
  }


  /**
   *
   *
   * @param {string} typeID
   * @returns
   * @memberof ContentService
   */
  getContentDataSourceByTypeID(typeID: string): Observable<ListContentDataSourceResponseModel> {
    if (!typeID) {
      throw new ParamsError('typeID', 'getContentDataSourceByTypeID', 'string', typeID);
    }
    return this.restAPIService.ListContentDataSource({ typeID }).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('getContentDataSourceByTypeID')),
      ModelMapper.rxMapModelTo(ListContentDataSourceResponseModel),
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
    return this.restAPIService.ListContentVersion({ contentID }).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('getContentVersionByContentID')),
      ModelMapper.rxMapModelTo(ListContentVersionResponseModel),
      map(res => res.datas)
    );
  }
}
