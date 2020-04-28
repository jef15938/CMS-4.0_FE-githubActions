import { API, MockAPI, RestfulAPI, APIRequest } from '@neux/core';
import { HttpParams } from '@angular/common/http';
import { StringUtils } from '@neux/core';
import {GalleryCategoryPutRequest} from '../bean/GalleryCategoryPutRequest';


/**
 * UpdateGalleryCategory
 */
export class PutGalleryCategoryByCategoryIDAPI implements API, MockAPI, RestfulAPI {

    public url:string;
    public requestBody: GalleryCategoryPutRequest;


    constructor() { }

    public getAPIName(): string {
        return 'PutGalleryCategoryByCategoryID';
    }

    public getRequestData(): APIRequest {
        let queryParams = new HttpParams();
        let requestData = new APIRequest();
        requestData.body = this.requestBody;

        requestData.type = 'PUT';
        requestData.params = queryParams;
        requestData.url = this.url;
        return requestData;
    }

    public getMockPath(): string {
        return './assets/mock/PutGalleryCategoryByCategoryIDAPI.json';
    }

}