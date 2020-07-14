import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ParamsError } from '@neux/core';
import { RestApiService } from '../../neuxAPI/rest-api.service';
import { FarmInfo, CmsFarmTableInfo, CmsFarmFormInfo } from '../../../../global/model';

import * as MOCK_NEWS_TEMP from './../../../../../../../../src/assets/mock/GetFarmByFuncIDAPI_news-temp.json';

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
    if (funcID === 'news-temp') {
      console.warn('MOCK_NEWS_TEMP = ', MOCK_NEWS_TEMP);
      return of((MOCK_NEWS_TEMP['default']) as FarmInfo);
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
    if (!funcID) { throw new ParamsError('funcID', 'getFarmTableInfoByFuncID', 'string', funcID); }
    if (!page) { throw new ParamsError('funcID', 'getFarmTableInfoByFuncID', 'number', page); }

    return this.restAPIService.dispatchRestApi('GetFarmTableInfoByFuncID', { funcID, page });
  }

  /**
   * For 資料預覽
   *
   * @param {string} farmID // 子層時用子層的category_id
   * @param {string} dataID
   * @returns
   * @memberof FarmService
   */
  getFarmDetailInfoByFuncID(farmID: string, dataID: string): Observable<CmsFarmFormInfo> {
    if (!farmID) { throw new ParamsError('funcID', 'GetFarmDetailInfoByFuncID', 'string', farmID); }
    if (!dataID) {
      throw new ParamsError('dataID', 'GetFarmDetailInfoByFuncID', 'string', dataID);
    }
    return this.restAPIService.dispatchRestApi('GetFarmDetailInfoByFuncID', { farmID, dataID });
  }

  /**
   * For 新增/修改取得資料和欄位 meta 呼叫
   *
   * @param {string} farmID // 子層時用子層的category_id
   * @param {string} dataID
   * @returns
   * @memberof FarmService
   */
  getFarmFormInfoByFuncID(farmID: string, dataID?: string): Observable<CmsFarmFormInfo> {
    if (!farmID) { throw new ParamsError('funcID', 'getFarmFormInfoByFuncID', 'string', farmID); }

    return this.restAPIService.dispatchRestApi('GetFarmFormInfoByFuncID', { farmID, dataID });
  }

}
