import { Injectable } from '@angular/core';
import { RestApiService } from '../neuxAPI/rest-api.service';
import { ParamsError } from '@neux/core';

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
   * @param {number} orderID Auditing order ID
   * @param {string} status required
   * @param {string} comment optional
   * @returns
   * @memberof AuditingService
   */
  approveAuditing(orderID: number, status: string, comment?: string) {
    if (!orderID) { throw new ParamsError('deptID', 'approveAuditing', 'number', orderID); }
    if (!status) { throw new ParamsError('status', 'approveAuditing', 'string', status); }

    const params: { [k: string]: any } = {
      orderID,
      status,
    };

    if (comment) { params.comment = comment; }

    return this.restAPIService.dispatchRestApi('PostAuditingByOrderID', params);
  }

  /**
   *
   *
   * @param {string} orderID Auditing order ID
   * @returns
   * @memberof AuditingService
   */
  getAuditingDetail(orderID: number) {
    if (!orderID) {
      throw new ParamsError('orderID', 'approveAuditing', 'string', orderID);
    }
    return this.restAPIService.dispatchRestApi('GetAuditingByOrderID', { orderID });
  }

  /**
   *
   *
   * @param {number} pageNumber number of page
   * @returns
   * @memberof AuditingService
   */
  getAuditingListByManager(pageNumber: number) {
    if (!pageNumber) {
      throw new ParamsError('pageNumber', 'getAuditingListByManager', 'number', pageNumber);
    }
    return this.restAPIService.dispatchRestApi('GetAuditing', { page: pageNumber });
  }
}
