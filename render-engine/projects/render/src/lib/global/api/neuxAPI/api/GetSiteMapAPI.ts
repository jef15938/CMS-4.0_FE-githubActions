import { Api, MockApi, RestfulApi, ApiRequest } from '@neux/core';
import { HttpParams } from '@angular/common/http';
import { StringUtils } from '@neux/core';


/**
 * GetSiteMap
 */
export class GetSiteMapAPI implements Api, MockApi, RestfulApi {

  public url: string;
  public nodeID: string;
  public level: number;


  constructor() { }

  public getApiName(): string {
    return 'GetSiteMap';
  }

  public getRequestData(): ApiRequest {
    let queryParams = new HttpParams();
    const requestData = new ApiRequest();
    queryParams = queryParams.set('nodeID',
      StringUtils.coerceStringProperty(this.nodeID));
    queryParams = queryParams.set('level',
      StringUtils.coerceStringProperty(this.level));

    requestData.type = 'GET';
    requestData.params = queryParams;
    requestData.url = this.url;
    return requestData;
  }

  public getMockPath(): string {
    return './assets/mock/GetSiteMapAPI.json';
  }

}
