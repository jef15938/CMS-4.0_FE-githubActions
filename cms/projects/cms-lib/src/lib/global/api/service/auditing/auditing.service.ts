import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ParamsError } from '@neux/core';
import { RestApiService } from '../../neuxAPI/rest-api.service';
import { MyAuditingDetailGetResponse } from '../../neuxAPI/bean/MyAuditingDetailGetResponse';
import { MyAuditingDetailInfo } from '../../neuxAPI/bean/MyAuditingDetailInfo';
import { MyAuditingGetResponse } from '../../neuxAPI/bean/MyAuditingGetResponse';
import { AuditingGetResponse } from '../../neuxAPI/bean/AuditingGetResponse';

@Injectable({
  providedIn: 'root'
})
export class AuditingService {

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
  getMyAuditingList(pageNumber: number = 1): Observable<MyAuditingGetResponse> {
    if (!pageNumber) {
      throw new ParamsError('pageNumber', 'getMyAuditingList', 'number', pageNumber);
    }
    return this.restAPIService.dispatchRestApi('GetMyAuditing', { page: pageNumber });
  }

  /**
   *
   *
   * @param {number} orderID Auditing order ID
   * @returns
   * @memberof AuditingService
   */
  getMyAuditingDetail(orderID: number): Observable<MyAuditingDetailInfo[]> {
    if (!orderID) {
      throw new ParamsError('orderID', 'getMyAuditingDetail', 'number', orderID);
    }
    return this.restAPIService.dispatchRestApi('GetMyAuditingByOrderID', { orderID }).pipe(
      map((res: MyAuditingDetailGetResponse) => res.datas)
    );
  }

  /**
   *
   *
   * @param {number} pageNumber number of page
   * @returns
   * @memberof AuditingService
   */
  getAuditingListForManager(pageNumber: number = 1): Observable<AuditingGetResponse> {
    if (!pageNumber) {
      throw new ParamsError('pageNumber', 'getAuditingListForManager', 'number', pageNumber);
    }
    return this.restAPIService.dispatchRestApi('GetAuditing', { page: pageNumber });
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
  approveAuditing(orderID: number, status: string, comment?: string) {
    if (!orderID) { throw new ParamsError('orderID', 'approveAuditing', 'number', orderID); }
    if (!status) { throw new ParamsError('status', 'approveAuditing', 'string', status); }

    const params: { [k: string]: any } = {
      orderID,
      status,
    };

    if (comment) { params.comment = comment; }

    return this.restAPIService.dispatchRestApi('PostAuditingByOrderID', params);
  }
}
