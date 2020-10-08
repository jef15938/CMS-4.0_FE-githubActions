import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ParamsError, ModelMapper } from '@neux/core';
import { RestApiService } from '../../neuxAPI/rest-api.service';
import { AuditingSubmitRequest } from '../../neuxAPI/bean/AuditingSubmitRequest';
import { AuditingGetResponseModel } from '../../data-model/models/auditing-get-response.model';
import { PreviewInfoModel } from '../../data-model/models/preview-info.model';
import { MyAuditingGetResponseModel } from '../../data-model/models/my-auditing-get-response.model';
import { MyAuditingDetailInfoModel } from '../../data-model/models/my-auditing-detail-info.model';
import { MyAuditingDetailGetResponseModel } from '../../data-model/models/my-auditing-detail-get-response.model';
import { AuditingServiceError, CmsErrorHandler } from '../../../error-handling';

@Injectable({
  providedIn: 'root'
})
export class AuditingService {

  error = new AuditingServiceError();

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
    return this.restAPIService.GetMyAuditing({ page: pageNumber }).pipe(
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
    return this.restAPIService.GetMyAuditingByOrderID({ orderID: `${orderID}` }).pipe(
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
    return this.restAPIService.GetAuditing({ page: pageNumber }).pipe(
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

    const params = {
      orderID: (Array.isArray(orderID) ? orderID.join(',') : orderID) as any,
      requestBody,
    };

    return this.restAPIService.PostAuditingByOrderID(params).pipe(
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
    return this.restAPIService.GetAuditingPreviewByOrderID({ orderID: `${orderID}` }).pipe(
      CmsErrorHandler.rxMapError(this.error.setMessage('GetAuditingPreviewByOrderID')),
      ModelMapper.rxMapModelTo(PreviewInfoModel),
    );
  }
}
