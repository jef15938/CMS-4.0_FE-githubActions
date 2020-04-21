import { API, MockAPI, RestfulAPI, APIRequest } from '@neux/core';
import { HttpParams } from '@angular/common/http';
import { StringUtils } from '@neux/core';


/**
 * GetGallery
 */
export class GetGalleryByCategoryIDAPI implements API, MockAPI, RestfulAPI {

    public url:string;
    public page: number;


    constructor() { }

    public getAPIName(): string {
        return 'GetGalleryByCategoryID';
    }

    public getRequestData(): APIRequest {
        let queryParams = new HttpParams();
        let requestData = new APIRequest();
        queryParams = queryParams.set('page', 
                      StringUtils.coerceStringProperty(this.page));

        requestData.type = 'GET';
        requestData.params = queryParams;
        requestData.url = this.url;
        return requestData;
    }

    public getMockPath(): string {
        return './assets/mock/GetGalleryByCategoryIDAPI.json';
    }

}