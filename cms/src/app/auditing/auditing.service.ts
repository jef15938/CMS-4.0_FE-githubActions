import { Injectable } from '@angular/core';
import { RestApiService } from 'src/neuxAPI/rest-api.service';
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
   * @param {string} orderID Auditing order ID
   * @returns
   * @memberof AuditingService
   */
  approveAuditing(orderID: string) {
    if (!orderID) {
      throw new ParamsError('orderID', 'approveAuditing', 'string', orderID);
    }
    return this.restAPIService.dispatchRestApi('PostAuditingByOrderID', { orderID });
  }

  /**
   *
   *
   * @param {string} orderID Auditing order ID
   * @returns
   * @memberof AuditingService
   */
  getAuditingDetail(orderID: string) {
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
