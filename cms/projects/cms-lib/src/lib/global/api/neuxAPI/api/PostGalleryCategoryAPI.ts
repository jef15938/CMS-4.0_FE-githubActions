import { API, MockAPI, RestfulAPI, APIRequest } from '@neux/core';
import { HttpParams } from '@angular/common/http';
import { StringUtils } from '@neux/core';
import {GalleryCategoryPutRequest} from '../bean/GalleryCategoryPutRequest';


/**
 * CreateGalleryCategory
 */
export class PostGalleryCategoryAPI implements API, MockAPI, RestfulAPI {

    public url:string;
    public requestBody: GalleryCategoryPutRequest;


    constructor() { }

    public getAPIName(): string {
        return 'PostGalleryCategory';
    }

    public getRequestData(): APIRequest {
        let queryParams = new HttpParams();
        let requestData = new APIRequest();
        requestData.body = this.requestBody;

        requestData.type = 'POST';
        requestData.params = queryParams;
        requestData.url = this.url;
        return requestData;
    }

    public getMockPath(): string {
        return './assets/mock/PostGalleryCategoryAPI.json';
    }

}