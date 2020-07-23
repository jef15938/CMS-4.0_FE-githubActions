import { Api, MockApi, RestfulApi, ApiRequest } from '@neux/core';
import { HttpParams } from '@angular/common/http';
import { StringUtils } from '@neux/core';


/**
 * GetPageInfo
 */
export class GetPageByPageIDAPI implements Api, MockApi, RestfulApi {

  public url: string;


  constructor() { }

  public getApiName(): string {
    return 'GetPageByPageID';
  }

  public getRequestData(): ApiRequest {
    const queryParams = new HttpParams();
    const requestData = new ApiRequest();

    requestData.type = 'GET';
    requestData.params = queryParams;
    requestData.url = this.url;
    return requestData;
  }

  public getMockPath(): string {
    return './assets/mock/GetPageByPageIDAPI.json';
  }

}
