import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ParamsError } from '@neux/core';
import { RestApiService } from '../../neuxAPI/rest-api.service';
import { MyAuditingDetailGetResponse } from '../../neuxAPI/bean/MyAuditingDetailGetResponse';
import { MyAuditingGetResponse } from '../../neuxAPI/bean/MyAuditingGetResponse';
import { AuditingGetResponse } from '../../neuxAPI/bean/AuditingGetResponse';
import { AuditingSubmitRequest } from '../../neuxAPI/bean/AuditingSubmitRequest';
import { PreviewInfo } from '../../neuxAPI/bean/PreviewInfo';
import { ModelMapper } from '@neux/core';
import { AuditingGetResponseModel } from '../../data-model/models/auditing-get-response.model';
import { PreviewInfoModel } from '../../data-model/models/preview-info.model';
import { MyAuditingGetResponseModel } from '../../data-model/models/my-auditing-get-response.model';
import { MyAuditingDetailInfoModel } from '../../data-model/models/my-auditing-detail-info.model';
import { MyAuditingDetailGetResponseModel } from '../../data-model/models/my-auditing-detail-get-response.model';
import { CmsErrorHandler } from '../../../error-handling/cms-error-handler';
import { CmsApiServiceError } from '../../../error-handling/type/api-service/api-service-error';

@Injectable({
  providedIn: 'root'
})
export class AuditingService {

  error = new CmsApiServiceError({ name: 'AuditingService' });

  constructor(
    private restAPIService: RestApiService
  ) { }

  /**
   *
   *
   * @param {number} pageNumber number of page
   * @returns
   * @memberof AuditingService
   */
  getMyAuditingList(pageNumber: number = 1): Observable<MyAuditingGetResponseModel> {
    if (!pageNumber) {
      throw new ParamsError('pageNumber', 'getMyAuditingList', 'number', pageNumber);
    }
    return this.restAPIService.dispatchRestApi<MyAuditingGetResponse>('GetMyAuditing', { page: pageNumber }).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('getMyAuditingList')),
      ModelMapper.rxMapModelTo(MyAuditingGetResponseModel),
    );
  }

  /**
   *
   *
   * @param {number} orderID Auditing order ID
   * @returns
   * @memberof AuditingService
   */
  getMyAuditingDetail(orderID: number): Observable<MyAuditingDetailInfoModel[]> {
    if (!orderID) {
      throw new ParamsError('orderID', 'getMyAuditingDetail', 'number', orderID);
    }
    return this.restAPIService.dispatchRestApi<MyAuditingDetailGetResponse>('GetMyAuditingByOrderID', { orderID }).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('getMyAuditingDetail')),
      ModelMapper.rxMapModelTo(MyAuditingDetailGetResponseModel),
      map(res => res.datas)
    );
  }

  /**
   *
   *
   * @param {number} pageNumber number of page
   * @returns
   * @memberof AuditingService
   */
  getAuditingListForManager(pageNumber: number = 1): Observable<AuditingGetResponseModel> {
    if (!pageNumber) {
      throw new ParamsError('pageNumber', 'getAuditingListForManager', 'number', pageNumber);
    }
    return this.restAPIService.dispatchRestApi<AuditingGetResponse>('GetAuditing', { page: pageNumber }).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('getAuditingListForManager')),
      ModelMapper.rxMapModelTo(AuditingGetResponseModel)
    );
  }

  /**
   *
   *
   * @param {number} orderID Auditing order ID
   * @param {string} status required
   * @param {string} comment optional
   * @returns
   * @memberof AuditingService
   */
  approveAuditing(orderID: number | number[], status: string, comment?: string) {
    if (!orderID) { throw new ParamsError('orderID', 'approveAuditing', 'number', orderID); }
    if (!status) { throw new ParamsError('status', 'approveAuditing', 'string', status); }

    const requestBody: AuditingSubmitRequest = {
      status,
      comment,
    };

    const params: { [k: string]: any } = {
      orderID: Array.isArray(orderID) ? orderID.join(',') : orderID,
      requestBody,
    };

    return this.restAPIService.dispatchRestApi('PostAuditingByOrderID', params).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('PostAuditingByOrderID')),
    );
  }

  /**
   *
   *
   * @param {number} orderID
   * @returns
   * @memberof AuditingService
   */
  getPreviewInfo(orderID: number): Observable<PreviewInfoModel> {
    if (!orderID) {
      throw new ParamsError('orderID', 'getPreviewInfo', 'number', orderID);
    }
    return this.restAPIService.dispatchRestApi<PreviewInfo>('GetAuditingPreviewByOrderID', { orderID }).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('GetAuditingPreviewByOrderID')),
      ModelMapper.rxMapModelTo(PreviewInfoModel),
    );
  }
}
