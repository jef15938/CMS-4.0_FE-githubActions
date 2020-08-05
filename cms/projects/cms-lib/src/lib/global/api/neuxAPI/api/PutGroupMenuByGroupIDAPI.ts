import { Api, MockApi, RestfulApi, ApiRequest } from '@neux/core';
import { HttpParams } from '@angular/common/http';
import { StringUtils } from '@neux/core';
import {GroupMenuGetResponse} from '../bean/GroupMenuGetResponse';


/**
 * PutGroupMenuList
 */
export class PutGroupMenuByGroupIDAPI implements Api, MockApi, RestfulApi {

    public url:string;
    public requestBody: GroupMenuGetResponse;


    constructor() { }

    public getApiName(): string {
        return 'PutGroupMenuByGroupID';
    }

    public getRequestData(): ApiRequest {
        let queryParams = new HttpParams();
        let requestData = new ApiRequest();
        requestData.body = this.requestBody;

        requestData.type = 'PUT';
        requestData.params = queryParams;
        requestData.url = this.url;
        return requestData;
    }

    public getMockPath(): string {
        return './assets/mock/PutGroupMenuByGroupIDAPI.json';
    }

}