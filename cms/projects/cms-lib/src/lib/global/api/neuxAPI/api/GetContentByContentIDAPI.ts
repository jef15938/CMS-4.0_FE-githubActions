import { Api, MockApi, RestfulApi, ApiRequest } from '@neux/core';
import { HttpParams } from '@angular/common/http';
import { StringUtils } from '@neux/core';


/**
 * GetContent
 */
export class GetContentByContentIDAPI implements Api, MockApi, RestfulApi {

    public url:string;
    public version: number;


    constructor() { }

    public getApiName(): string {
        return 'GetContentByContentID';
    }

    public getRequestData(): ApiRequest {
        let queryParams = new HttpParams();
        let requestData = new ApiRequest();
        queryParams = queryParams.set('version', 
                      StringUtils.coerceStringProperty(this.version));

        requestData.type = 'GET';
        requestData.params = queryParams;
        requestData.url = this.url;
        return requestData;
    }

    public getMockPath(): string {
        return './assets/mock/GetContentByContentIDAPI.json';
    }

}