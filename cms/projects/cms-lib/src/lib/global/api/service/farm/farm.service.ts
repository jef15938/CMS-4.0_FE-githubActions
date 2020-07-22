import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParamsError } from '@neux/core';
import { RestApiService } from '../../neuxAPI/rest-api.service';
import { FarmAuditingRequest } from '../../neuxAPI/bean/FarmAuditingRequest';
import { FarmInfo, CmsFarmTableInfo, CmsFarmFormInfo } from '../../../../global/model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FarmService {

  constructor(
    private restAPIService: RestApiService,
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
    return this.restAPIService.dispatchRestApi('GetFarmFormInfoByFuncID', { funcID, dataID });
  }

  /**
   * 新增 FarmForm
   *
   * @param {string} funcID // 子層時用子層的category_id
   * @returns
   * @memberof FarmService
   */
  createFarmForm(funcID: string, formData: FormData) {
    if (!funcID) { throw new ParamsError('funcID', 'createFarmForm', 'string', funcID); }
    if (!formData) { throw new ParamsError('formData', 'createFarmForm', 'FormData', formData); }

    const header = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });

    return this.restAPIService.dispatchRestApi('PostFarmFormInfoByFuncID', { funcID, requestBody: formData }, { header });
  }

  /**
   * 修改 FarmForm
   *
   * @param {string} funcID // 子層時用子層的category_id
   * @returns
   * @memberof FarmService
   */
  updateFarmForm(funcID: string, dataID: string, formData: FormData) {
    if (!funcID) { throw new ParamsError('funcID', 'updateFarmForm', 'string', funcID); }
    if (!dataID) { throw new ParamsError('dataID', 'updateFarmForm', 'string', dataID); }
    if (!formData) { throw new ParamsError('formData', 'updateFarmForm', 'FormData', formData); }

    const header = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });

    return this.restAPIService.dispatchRestApi('PostFarmFormInfoByFuncID', { funcID, requestBody: formData }, { header });
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
