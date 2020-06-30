import { Api, MockApi, RestfulApi, ApiRequest } from '@neux/core';
import { HttpParams } from '@angular/common/http';
import { StringUtils } from '@neux/core';
import {ContentInfo} from '../bean/ContentInfo';


/**
 * UpdateContent
 */
export class PutContentByContentIDAPI implements Api, MockApi, RestfulApi {

    public url:string;
    public requestBody: ContentInfo;


    constructor() { }

    public getApiName(): string {
        return 'PutContentByContentID';
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
        return './assets/mock/PutContentByContentIDAPI.json';
    }

}