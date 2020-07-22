import { Api, MockApi, RestfulApi, ApiRequest } from '@neux/core';
import { HttpParams } from '@angular/common/http';
import { StringUtils } from '@neux/core';


/**
 * UpdateGallery
 */
export class PutGalleryByGalleryIDAPI implements Api, MockApi, RestfulApi {

    public url:string;
    public requestBody: any;


    constructor() { }

    public getApiName(): string {
        return 'PutGalleryByGalleryID';
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
        return './assets/mock/PutGalleryByGalleryIDAPI.json';
    }

}