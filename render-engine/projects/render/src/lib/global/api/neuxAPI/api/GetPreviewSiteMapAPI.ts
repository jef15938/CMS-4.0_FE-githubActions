import { Api, MockApi, RestfulApi, ApiRequest } from '@neux/core';
import { HttpParams } from '@angular/common/http';
import { StringUtils } from '@neux/core';


/**
 * GetPreviewSiteMap
 */
export class GetPreviewSiteMapAPI implements Api, MockApi, RestfulApi {

  public url: string;


  constructor() { }

  public getApiName(): string {
    return 'GetPreviewSiteMap';
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
    return './assets/mock/GetPreviewSiteMapAPI.json';
  }

}
