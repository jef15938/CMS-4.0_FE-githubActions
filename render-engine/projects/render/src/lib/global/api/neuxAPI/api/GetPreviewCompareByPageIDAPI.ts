import { Api, MockApi, RestfulApi, ApiRequest } from '@neux/core';
import { HttpParams } from '@angular/common/http';
import { StringUtils } from '@neux/core';


/**
 * GetPreviewCompareInfo
 */
export class GetPreviewCompareByPageIDAPI implements Api, MockApi, RestfulApi {

  public url: string;


  constructor() { }

  public getApiName(): string {
    return 'GetPreviewCompareByPageID';
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
    return './assets/mock/GetPreviewCompareByPageIDAPI.json';
  }

}
