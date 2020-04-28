import { API, MockAPI, RestfulAPI, APIRequest } from '@neux/core';
import { HttpParams } from '@angular/common/http';
import { StringUtils } from '@neux/core';


/**
 * GetAuditingDetail
 */
export class GetAuditingByOrderIDAPI implements API, MockAPI, RestfulAPI {

    public url:string;
    

    constructor() { }

    public getAPIName(): string {
        return 'GetAuditingByOrderID';
    }

    public getRequestData(): APIRequest {
        let queryParams = new HttpParams();
        let requestData = new APIRequest();
        
        requestData.type = 'GET';
        requestData.params = queryParams;
        requestData.url = this.url;
        return requestData;
    }

    public getMockPath(): string {
        return './assets/mock/GetAuditingByOrderIDAPI.json';
    }

}