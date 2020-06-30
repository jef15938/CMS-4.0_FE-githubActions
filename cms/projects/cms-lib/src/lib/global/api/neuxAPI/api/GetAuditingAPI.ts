import { Api, MockApi, RestfulApi, ApiRequest } from '@neux/core';
import { HttpParams } from '@angular/common/http';
import { StringUtils } from '@neux/core';


/**
 * GetAuditingList
 */
export class GetAuditingAPI implements Api, MockApi, RestfulApi {

    public url:string;
    public page: number;


    constructor() { }

    public getApiName(): string {
        return 'GetAuditing';
    }

    public getRequestData(): ApiRequest {
        let queryParams = new HttpParams();
        let requestData = new ApiRequest();
        queryParams = queryParams.set('page', 
                      StringUtils.coerceStringProperty(this.page));

        requestData.type = 'GET';
        requestData.params = queryParams;
        requestData.url = this.url;
        return requestData;
    }

    public getMockPath(): string {
        return './assets/mock/GetAuditingAPI.json';
    }

}