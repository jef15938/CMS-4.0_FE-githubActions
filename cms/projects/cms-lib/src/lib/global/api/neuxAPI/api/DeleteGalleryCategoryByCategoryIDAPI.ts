import { Api, MockApi, RestfulApi, ApiRequest } from '@neux/core';
import { HttpParams } from '@angular/common/http';
import { StringUtils } from '@neux/core';


/**
 * DeleteGalleryCategory
 */
export class DeleteGalleryCategoryByCategoryIDAPI implements Api, MockApi, RestfulApi {

    public url:string;
    

    constructor() { }

    public getApiName(): string {
        return 'DeleteGalleryCategoryByCategoryID';
    }

    public getRequestData(): ApiRequest {
        let queryParams = new HttpParams();
        let requestData = new ApiRequest();
        
        requestData.type = 'DELETE';
        requestData.params = queryParams;
        requestData.url = this.url;
        return requestData;
    }

    public getMockPath(): string {
        return './assets/mock/DeleteGalleryCategoryByCategoryIDAPI.json';
    }

}