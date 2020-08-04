import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ParamsError } from '@neux/core';
import { RestApiService } from '../../neuxAPI/rest-api.service';
import { FarmAuditingRequest } from '../../neuxAPI/bean/FarmAuditingRequest';
import { FarmInfo, CmsFarmTableInfo, CmsFarmFormInfo } from '../../../../global/model';
import { CMS_ENVIROMENT_TOKEN } from '../../../injection-token/cms-injection-token';
import { CmsEnviroment } from '../../../interface';
import { HttpHeaders } from '@angular/common/http';
import { PreviewInfo } from '../../neuxAPI/bean/PreviewInfo';
import { ListFarmTriggerDataResponse } from '../../neuxAPI/bean/ListFarmTriggerDataResponse';
import { FarmOptionInfo } from '../../neuxAPI/bean/FarmOptionInfo';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FarmService {

  constructor(
    private restAPIService: RestApiService,
    @Inject(CMS_ENVIROMENT_TOKEN) private environment: CmsEnviroment,
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
    return this.restAPIService.dispatchRestApi<FarmInfo>('GetFarmByFuncID', { funcID });
  }

  /**
   *
   *
   * @param {string} funcID // 子層時用子層的category_id
   * @param {number} page
   * @returns
   * @memberof FarmService
   */
  getFarmTableInfoByFuncID(funcID: string, page: number, extraQueryParams: { [key: string]: string }): Observable<CmsFarmTableInfo> {
    if (!funcID) { throw new ParamsError('funcID', 'getFarmTableInfoByFuncID', 'string', funcID); }
    if (!page) { throw new ParamsError('funcID', 'getFarmTableInfoByFuncID', 'number', page); }
    return this.restAPIService.dispatchRestApi('GetFarmTableInfoByFuncID', { funcID, page }, { extraQueryParams });
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
    return this.restAPIService.dispatchRestApi<CmsFarmFormInfo>('GetFarmFormInfoByFuncID', { funcID, dataID });
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

    const url = `${this.environment.apiBaseUrl}/FarmFormInfo/${funcID}`;
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

    formData.forEach((v, k) => {
      console.log('formData ' + k + ' = ' + v);
    });

    return this.restAPIService.dispatchRestApi('PutFarmFormInfoByFuncID', { funcID, dataID, requestBody: formData }, { header });
  }

  /**
   *
   * @returns
   * @memberof FarmService
   */
  auditingFarmData(funcId: string, dataID: string, startTime: string, endTime: string, memo: string) {
    if (!funcId) { throw new ParamsError('funcId', 'auditingFarmData', 'string', funcId); }
    if (!dataID) { throw new ParamsError('dataID', 'auditingFarmData', 'string', dataID); }
    if (!startTime) { throw new ParamsError('startTime', 'auditingFarmData', 'string', startTime); }
    if (!endTime) { throw new ParamsError('endTime', 'auditingFarmData', 'string', endTime); }
    if (!memo) { throw new ParamsError('memo', 'auditingFarmData', 'string', memo); }

    const requestBody: FarmAuditingRequest = {
      data_id: dataID,
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

  /**
   *
   * @returns
   * @memberof FarmService
   */
  takeOffFormData(funcID: string, dataID: string) {
    if (!funcID) { throw new ParamsError('funcID', 'takeOffFormData', 'string', funcID); }
    if (!dataID) { throw new ParamsError('dataID', 'takeOffFormData', 'string', dataID); }

    const params: { [k: string]: any } = {
      funcID,
      dataID,
    };

    return this.restAPIService.dispatchRestApi('GetFarmTakeOffByFuncID', params);
  }

  /**
   *
   *
   * @param {string} funcID
   * @returns
   * @memberof FarmService
   */
  getPreviewInfo(funcID: string): Observable<PreviewInfo> {
    if (!funcID) {
      throw new ParamsError('funcID', 'getPreviewInfo', 'string', funcID);
    }
    return this.restAPIService.dispatchRestApi<PreviewInfo>('GetFarmPreviewByFuncID', { funcID });
  }

  /**
   *
   *
   * @param {string} triggerID
   * @returns
   * @memberof FarmService
   */
  listFarmTriggerData(triggerID: string): Observable<FarmOptionInfo[]> {
    if (!triggerID) {
      throw new ParamsError('triggerID', 'listFarmTriggerData', 'string', triggerID);
    }
    return this.restAPIService.dispatchRestApi<ListFarmTriggerDataResponse>('GetFarmTriggerByTriggerID', { triggerID })
      .pipe(map(res => res.datas));
  }
}
