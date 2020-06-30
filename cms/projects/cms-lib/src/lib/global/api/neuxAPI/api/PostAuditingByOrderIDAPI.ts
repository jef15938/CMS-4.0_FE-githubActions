import { Api, MockApi, RestfulApi, ApiRequest } from '@neux/core';
import { HttpParams } from '@angular/common/http';
import { StringUtils } from '@neux/core';
import {AuditingSubmitRequest} from '../bean/AuditingSubmitRequest';


/**
 * ApproveAuditing
 */
export class PostAuditingByOrderIDAPI implements Api, MockApi, RestfulApi {

    public url:string;
    public requestBody: AuditingSubmitRequest;


    constructor() { }

    public getApiName(): string {
        return 'PostAuditingByOrderID';
    }

    public getRequestData(): ApiRequest {
        let queryParams = new HttpParams();
        let requestData = new ApiRequest();
        requestData.body = this.requestBody;

        requestData.type = 'POST';
        requestData.params = queryParams;
        requestData.url = this.url;
        return requestData;
    }

    public getMockPath(): string {
        return './assets/mock/PostAuditingByOrderIDAPI.json';
    }

}