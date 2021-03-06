import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { ParamsError, ModelMapper } from '@neux/core';
import { RestApiService } from '../../neuxAPI/rest-api.service';
import { FarmAuditingRequest } from '../../neuxAPI/bean/FarmAuditingRequest';
import { CMS_ENVIROMENT_TOKEN } from '../../../injection-token/cms-injection-token';
import { CmsEnviroment } from '../../../interface';
import { PreviewInfoModel } from '../../data-model/models/preview-info.model';
import { FarmOptionInfoModel } from '../../data-model/models/farm-option-info.model';
import { ListFarmTriggerDataResponseModel } from '../../data-model/models/list-farm-trigger-data-response.model';
import { GetFarmTreeResponseModel } from '../../data-model/models/get-farm-tree-response.model';
import { FarmFormInfoModel } from '../../data-model/models/farm-form-info.model';
import { FarmInfoGetResponse } from '../../neuxAPI/bean/FarmInfoGetResponse';
import { FarmInfoGetResponseModel } from '../../data-model/models/farm-info-get-response.model';
import { FarmTableInfoModel } from '../../data-model/models/farm-table-info.model';
import { FarmServiceError, CmsErrorHandler } from '../../../error-handling';

@Injectable({
  providedIn: 'root'
})
export class FarmService {

  error = new FarmServiceError();

  constructor(
    private restAPIService: RestApiService,
    @Inject(CMS_ENVIROMENT_TOKEN) private environment: CmsEnviroment,
    private httpClient: HttpClient,
  ) { }

  /**
   *
   *
   * @param {string} funcID // 子層時用子層的category_id
   * @returns
   * @memberof FarmService
   */
  getFarmByFuncID(funcID: string, dataID = '', parentID = ''): Observable<FarmInfoGetResponseModel> {
    if (!funcID) {
      throw new ParamsError('funcID', 'getFarmByFuncID', 'string', funcID);
    }
    return this.restAPIService.GetFarmByFuncID({ funcID, dataID, parentID }).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('getFarmByFuncID')),
      map(x => plainToClass(FarmInfoGetResponse, x)),
      ModelMapper.rxMapModelTo(FarmInfoGetResponseModel)
    );
  }

  /**
   *
   *
   * @param {string} funcID // 子層時用子層的category_id
   * @param {number} page
   * @returns
   * @memberof FarmService
   */
  getFarmTableInfoByFuncID(funcID: string, page: number, extraQueryParams: { [key: string]: string }): Observable<FarmTableInfoModel> {
    if (!funcID) { throw new ParamsError('funcID', 'getFarmTableInfoByFuncID', 'string', funcID); }
    if (!page) { throw new ParamsError('funcID', 'getFarmTableInfoByFuncID', 'number', page); }
    return this.restAPIService.GetFarmTableInfoByFuncID({ funcID, page }, { extraQueryParams }).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('getFarmTableInfoByFuncID')),
      ModelMapper.rxMapModelTo(FarmTableInfoModel)
    );
  }

  /**
   * For 資料預覽
   *
   * @param {string} funcID // 子層時用子層的category_id
   * @param {string} dataID
   * @returns
   * @memberof FarmService
   */
  getFarmDetailInfoByFuncID(funcID: string, dataID: string): Observable<FarmFormInfoModel> {
    if (!funcID) { throw new ParamsError('funcID', 'GetFarmDetailInfoByFuncID', 'string', funcID); }
    if (!dataID) {
      throw new ParamsError('dataID', 'GetFarmDetailInfoByFuncID', 'string', dataID);
    }
    return this.restAPIService.GetFarmDetailInfoByFuncID({ funcID, dataID }).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('getFarmDetailInfoByFuncID')),
      ModelMapper.rxMapModelTo(FarmFormInfoModel),
    );
  }

  /**
   * For 新增/修改取得資料和欄位 meta 呼叫
   *
   * @param {string} funcID // 子層時用子層的category_id
   * @param {string} dataID
   * @returns
   * @memberof FarmService
   */
  getFarmFormInfoByFuncID(funcID: string, dataID?: string): Observable<FarmFormInfoModel> {
    if (!funcID) { throw new ParamsError('funcID', 'getFarmFormInfoByFuncID', 'string', funcID); }
    return this.restAPIService.GetFarmFormInfoByFuncID({ funcID, dataID }).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('getFarmFormInfoByFuncID')),
      ModelMapper.rxMapModelTo(FarmFormInfoModel),
    );
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

    return this.restAPIService.PostFarmFormInfoByFuncID({ funcID, requestBody: formData } as any, { header }).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('createFarmForm')),
    );
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

    return this.restAPIService.PostFarmFormInfoByFuncID({ funcID, dataID, requestBody: formData } as any, { header }).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('updateFarmForm')),
    );
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

    const params = {
      funcId,
      requestBody,
    };

    return this.restAPIService.PostFarmAuditingByFuncId(params).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('auditingFarmData')),
    );
  }

  /**
   *
   * @returns
   * @memberof FarmService
   */
  takeOffFormData(funcID: string, dataID: string) {
    if (!funcID) { throw new ParamsError('funcID', 'takeOffFormData', 'string', funcID); }
    if (!dataID) { throw new ParamsError('dataID', 'takeOffFormData', 'string', dataID); }

    const params = {
      funcID,
      dataID,
    };

    return this.restAPIService.GetFarmTakeOffByFuncID(params).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('takeOffFormData')),
    );
  }

  /**
   *
   *
   * @param {string} funcID
   * @returns
   * @memberof FarmService
   */
  getPreviewInfo(funcID: string, dataID: string): Observable<PreviewInfoModel> {
    if (!funcID) { throw new ParamsError('funcID', 'getPreviewInfo', 'string', funcID); }
    if (!dataID) { throw new ParamsError('dataID', 'getPreviewInfo', 'string', dataID); }
    return this.restAPIService.GetFarmPreviewByFuncID({ funcID, dataID }).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('getPreviewInfo')),
      ModelMapper.rxMapModelTo(PreviewInfoModel),
    );
  }

  /**
   *
   *
   * @param {string} triggerID
   * @returns
   * @memberof FarmService
   */
  listFarmTriggerData(triggerID: string, params: { [columnId: string]: any }): Observable<FarmOptionInfoModel[]> {
    if (!triggerID) {
      throw new ParamsError('triggerID', 'listFarmTriggerData', 'string', triggerID);
    }
    params = params || {};
    const paramsKeys = Object.keys(params);
    paramsKeys.forEach(k => {
      params[k] = params[k] || '';
    });
    return this.restAPIService.GetFarmTriggerByTriggerID({ ...params, triggerID }).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('listFarmTriggerData')),
      ModelMapper.rxMapModelTo(ListFarmTriggerDataResponseModel),
      map(res => res.datas)
    );
  }

  /**
   *
   *
   * @param {string} funcID
   * @returns
   * @memberof FarmService
   */
  getFarmTree(sourceID: string): Observable<GetFarmTreeResponseModel> {
    if (!sourceID) {
      throw new ParamsError('sourceID', 'getFarmTree', 'string', sourceID);
    }
    return this.restAPIService.GetFarmTreeBySourceID({ sourceID }).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('getFarmTree')),
      ModelMapper.rxMapModelTo(GetFarmTreeResponseModel),
    );
  }
}
