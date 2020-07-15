import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ParamsError } from '@neux/core';
import { RestApiService } from '../../neuxAPI/rest-api.service';
import { FarmInfo, CmsFarmTableInfo, CmsFarmFormInfo } from '../../../../global/model';
// NEWS TYPE
import * as MOCK_NEWS_TYPE from './../../../../../../../../src/assets/mock/GetFarmByFuncIDAPI_news-type.json';
import * as MOCK_NEWS_TYPE_TABLE_INFO from './../../../../../../../../src/assets/mock/GetFarmTableInfoByFuncIDAPI_news-type.json';
import * as MOCK_NEWS_TYPE_DETAIL_INFO from './../../../../../../../../src/assets/mock/GetFarmDetailInfoByFuncIDAPI_news-type.json';
import * as MOCK_NEWS_TYPE_FORM_INFO from './../../../../../../../../src/assets/mock/GetFarmFormInfoByFuncIDAPI_news-type.json';
// NEWS TEMP
import * as MOCK_NEWS_TEMP from './../../../../../../../../src/assets/mock/GetFarmByFuncIDAPI_news-temp.json';
import * as MOCK_NEWS_TEMP_TABLE_INFO from './../../../../../../../../src/assets/mock/GetFarmTableInfoByFuncIDAPI_news-temp.json';
import * as MOCK_NEWS_TEMP_DETAIL_INFO from './../../../../../../../../src/assets/mock/GetFarmDetailInfoByFuncIDAPI_news-temp.json';
import * as MOCK_NEWS_TEMP_FORM_INFO from './../../../../../../../../src/assets/mock/GetFarmFormInfoByFuncIDAPI_news-temp.json';
// QA TYPE
import * as MOCK_QA_TYPE from './../../../../../../../../src/assets/mock/GetFarmByFuncIDAPI_qa-type.json';
import * as MOCK_QA_TYPE_TABLE_INFO from './../../../../../../../../src/assets/mock/GetFarmTableInfoByFuncIDAPI_qa-type.json';
import * as MOCK_QA_TYPE_DETAIL_INFO from './../../../../../../../../src/assets/mock/GetFarmDetailInfoByFuncIDAPI_qa-type.json';
import * as MOCK_QA_TYPE_FORM_INFO from './../../../../../../../../src/assets/mock/GetFarmFormInfoByFuncIDAPI_qa-type.json';
// QA TEMP
import * as MOCK_QA_TEMP from './../../../../../../../../src/assets/mock/GetFarmByFuncIDAPI_qa-temp.json';
import * as MOCK_QA_TEMP_TABLE_INFO from './../../../../../../../../src/assets/mock/GetFarmTableInfoByFuncIDAPI_qa-temp.json';
import * as MOCK_QA_TEMP_DETAIL_INFO from './../../../../../../../../src/assets/mock/GetFarmDetailInfoByFuncIDAPI_qa-temp.json';
import * as MOCK_QA_TEMP_FORM_INFO from './../../../../../../../../src/assets/mock/GetFarmFormInfoByFuncIDAPI_qa-temp.json';
// SLIDER TYPE
import * as MOCK_SLIDER_TYPE from './../../../../../../../../src/assets/mock/GetFarmByFuncIDAPI_slider-type.json';
import * as MOCK_SLIDER_TYPE_TABLE_INFO from './../../../../../../../../src/assets/mock/GetFarmTableInfoByFuncIDAPI_slider-type.json';
import * as MOCK_SLIDER_TYPE_DETAIL_INFO from './../../../../../../../../src/assets/mock/GetFarmDetailInfoByFuncIDAPI_slider-type.json';
import * as MOCK_SLIDER_TYPE_FORM_INFO from './../../../../../../../../src/assets/mock/GetFarmFormInfoByFuncIDAPI_slider-type.json';
// SLIDER TEMP
import * as MOCK_SLIDER_TEMP from './../../../../../../../../src/assets/mock/GetFarmByFuncIDAPI_slider-temp.json';
import * as MOCK_SLIDER_TEMP_TABLE_INFO from './../../../../../../../../src/assets/mock/GetFarmTableInfoByFuncIDAPI_slider-temp.json';
import * as MOCK_SLIDER_TEMP_DETAIL_INFO from './../../../../../../../../src/assets/mock/GetFarmDetailInfoByFuncIDAPI_slider-temp.json';
import * as MOCK_SLIDER_TEMP_FORM_INFO from './../../../../../../../../src/assets/mock/GetFarmFormInfoByFuncIDAPI_slider-temp.json';
import { FarmAuditingRequest } from '../../neuxAPI/bean/FarmAuditingRequest';

@Injectable({
  providedIn: 'root'
})
export class FarmService {

  constructor(
    private restAPIService: RestApiService
  ) { }

  /**
   *
   *
   * @param {string} funcID // 子層時用子層的category_id
   * @returns
   * @memberof FarmService
   */
  getFarmByFuncID(funcID: string): Observable<FarmInfo> {
    console.warn('getFarmByFuncID() funcID = ', funcID);
    if (!funcID) {
      throw new ParamsError('funcID', 'getFarmByFuncID', 'string', funcID);
    }
    if (funcID === 'news-type') {
      return of(((MOCK_NEWS_TYPE as any).default) as FarmInfo);
    }
    if (funcID === 'news-temp') {
      return of(((MOCK_NEWS_TEMP as any).default) as FarmInfo);
    }
    if (funcID === 'qa-type') {
      return of(((MOCK_QA_TYPE as any).default) as FarmInfo);
    }
    if (funcID === 'qa-temp') {
      return of(((MOCK_QA_TEMP as any).default) as FarmInfo);
    }
    if (funcID === 'slider-type') {
      return of(((MOCK_SLIDER_TYPE as any).default) as FarmInfo);
    }
    if (funcID === 'slider-temp') {
      return of(((MOCK_SLIDER_TEMP as any).default) as FarmInfo);
    }
    return this.restAPIService.dispatchRestApi('GetFarmByFuncID', { funcID });
  }

  /**
   *
   *
   * @param {string} funcID // 子層時用子層的category_id
   * @param {number} page
   * @returns
   * @memberof FarmService
   */
  getFarmTableInfoByFuncID(funcID: string, page: number): Observable<CmsFarmTableInfo> {
    console.warn('getFarmTableInfoByFuncID() funcID = ', funcID);
    console.warn('                            page = ', page);
    if (!funcID) { throw new ParamsError('funcID', 'getFarmTableInfoByFuncID', 'string', funcID); }
    if (!page) { throw new ParamsError('funcID', 'getFarmTableInfoByFuncID', 'number', page); }
    if (funcID === 'news-type') {
      return of(((MOCK_NEWS_TYPE_TABLE_INFO as any).default) as CmsFarmTableInfo);
    }
    if (funcID === 'news-temp') {
      return of(((MOCK_NEWS_TEMP_TABLE_INFO as any).default) as CmsFarmTableInfo);
    }
    if (funcID === 'qa-type') {
      return of(((MOCK_QA_TYPE_TABLE_INFO as any).default) as CmsFarmTableInfo);
    }
    if (funcID === 'qa-temp') {
      return of(((MOCK_QA_TEMP_TABLE_INFO as any).default) as CmsFarmTableInfo);
    }
    if (funcID === 'slider-type') {
      return of(((MOCK_SLIDER_TYPE_TABLE_INFO as any).default) as CmsFarmTableInfo);
    }
    if (funcID === 'slider-temp') {
      return of(((MOCK_SLIDER_TEMP_TABLE_INFO as any).default) as CmsFarmTableInfo);
    }
    return this.restAPIService.dispatchRestApi('GetFarmTableInfoByFuncID', { funcID, page });
  }

  /**
   * For 資料預覽
   *
   * @param {string} funcID // 子層時用子層的category_id
   * @param {string} dataID
   * @returns
   * @memberof FarmService
   */
  getFarmDetailInfoByFuncID(funcID: string, dataID: string): Observable<CmsFarmFormInfo> {
    console.warn('getFarmDetailInfoByFuncID() funcID = ', funcID);
    console.warn('                            dataID = ', dataID);
    if (!funcID) { throw new ParamsError('funcID', 'GetFarmDetailInfoByFuncID', 'string', funcID); }
    if (!dataID) {
      throw new ParamsError('dataID', 'GetFarmDetailInfoByFuncID', 'string', dataID);
    }
    if (funcID === 'news-type') {
      return of(((MOCK_NEWS_TYPE_DETAIL_INFO as any).default) as CmsFarmFormInfo);
    }
    if (funcID === 'news-temp') {
      return of(((MOCK_NEWS_TEMP_DETAIL_INFO as any).default) as CmsFarmFormInfo);
    }
    if (funcID === 'qa-type') {
      return of(((MOCK_QA_TYPE_DETAIL_INFO as any).default) as CmsFarmFormInfo);
    }
    if (funcID === 'qa-temp') {
      return of(((MOCK_QA_TEMP_DETAIL_INFO as any).default) as CmsFarmFormInfo);
    }
    if (funcID === 'slider-type') {
      return of(((MOCK_SLIDER_TYPE_DETAIL_INFO as any).default) as CmsFarmFormInfo);
    }
    if (funcID === 'slider-temp') {
      return of(((MOCK_SLIDER_TEMP_DETAIL_INFO as any).default) as CmsFarmFormInfo);
    }
    return this.restAPIService.dispatchRestApi('GetFarmDetailInfoByFuncID', { funcID, dataID });
  }

  /**
   * For 新增/修改取得資料和欄位 meta 呼叫
   *
   * @param {string} funcID // 子層時用子層的category_id
   * @param {string} dataID
   * @returns
   * @memberof FarmService
   */
  getFarmFormInfoByFuncID(funcID: string, dataID?: string): Observable<CmsFarmFormInfo> {
    console.warn('getFarmFormInfoByFuncID() funcID = ', funcID);
    console.warn('                            dataID = ', dataID);
    if (!funcID) { throw new ParamsError('funcID', 'getFarmFormInfoByFuncID', 'string', funcID); }
    if (funcID === 'news-type') {
      return of(((MOCK_NEWS_TYPE_FORM_INFO as any).default) as CmsFarmFormInfo);
    }
    if (funcID === 'news-temp') {
      return of(((MOCK_NEWS_TEMP_FORM_INFO as any).default) as CmsFarmFormInfo);
    }
    if (funcID === 'qa-type') {
      return of(((MOCK_QA_TYPE_FORM_INFO as any).default) as CmsFarmFormInfo);
    }
    if (funcID === 'qa-temp') {
      return of(((MOCK_QA_TEMP_FORM_INFO as any).default) as CmsFarmFormInfo);
    }
    if (funcID === 'slider-type') {
      return of(((MOCK_SLIDER_TYPE_FORM_INFO as any).default) as CmsFarmFormInfo);
    }
    if (funcID === 'slider-temp') {
      return of(((MOCK_SLIDER_TEMP_FORM_INFO as any).default) as CmsFarmFormInfo);
    }
    return this.restAPIService.dispatchRestApi('GetFarmFormInfoByFuncID', { funcID, dataID });
  }

  /**
   *
   * @returns
   * @memberof FarmService
   */
  auditingFarmData(funcId: string, dataId: string, startTime: string, endTime: string, memo: string) {
    if (!funcId) { throw new ParamsError('funcId', 'auditingFarmData', 'string', funcId); }
    if (!dataId) { throw new ParamsError('dataId', 'auditingFarmData', 'string', dataId); }
    if (!startTime) { throw new ParamsError('startTime', 'auditingFarmData', 'string', startTime); }
    if (!endTime) { throw new ParamsError('endTime', 'auditingFarmData', 'string', endTime); }
    if (!memo) { throw new ParamsError('memo', 'auditingFarmData', 'string', memo); }

    const requestBody: FarmAuditingRequest = {
      data_id: dataId,
      start_time: startTime,
      end_time: endTime,
      memo,
      func_id: funcId
    };

    const params: { [k: string]: any } = {
      funcId,
      requestBody,
    };

    return this.restAPIService.dispatchRestApi('PostFarmAuditingByFuncId', params);
  }

}
