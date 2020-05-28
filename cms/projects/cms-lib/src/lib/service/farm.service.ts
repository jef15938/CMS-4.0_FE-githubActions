import { Injectable } from '@angular/core';
import { RestApiService } from '../neuxAPI/rest-api.service';
import { Observable } from 'rxjs';
import { FarmInfo, CmsFarmTableInfo, CmsFarmFormInfo } from '../type/farm.class';
import { ParamsError } from '@neux/core';

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
    if (!funcID) {
      throw new ParamsError('funcID', 'getFarmByFuncID', 'string', funcID);
    }
    return this.restAPIService.dispatchRestApi('GetFarmByFuncID', { funcID });;
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
    if (!funcID) {
      throw new ParamsError('funcID', 'getFarmTableInfoByFuncID', 'string', funcID);
    }
    if (!page) {
      throw new ParamsError('funcID', 'getFarmTableInfoByFuncID', 'number', page);
    }
    return this.restAPIService.dispatchRestApi('GetFarmTableInfoByFuncID', { funcID, page });;
  }

  /**
   * For 資料預覽
   *
   * @param {string} farmID // 子層時用子層的category_id
   * @param {string} dataID
   * @returns
   * @memberof FarmService
   */
  getFarmDetailInfoByFarmID(farmID: string, dataID: string): Observable<CmsFarmFormInfo> {
    if (!farmID) {
      throw new ParamsError('funcID', 'getFarmDetailInfoByFarmID', 'string', farmID);
    }
    if (!dataID) {
      throw new ParamsError('dataID', 'getFarmDetailInfoByFarmID', 'string', dataID);
    }
    return this.restAPIService.dispatchRestApi('GetFarmDetailInfoByFarmID', { farmID, dataID });;
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
    if (!farmID) {
      throw new ParamsError('funcID', 'getFarmFormInfoByFuncID', 'string', farmID);
    }
    return this.restAPIService.dispatchRestApi('GetFarmFormInfoByFuncID', { farmID, dataID });;
  }

}
