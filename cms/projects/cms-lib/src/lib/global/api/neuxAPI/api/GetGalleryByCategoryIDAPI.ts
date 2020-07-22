import { Api, MockApi, RestfulApi, ApiRequest } from '@neux/core';
import { HttpParams } from '@angular/common/http';
import { StringUtils } from '@neux/core';


/**
 * GetGallery
 */
export class GetGalleryByCategoryIDAPI implements Api, MockApi, RestfulApi {

    public url:string;
    public page: number;
public fileType: string;
public fileName: string;


    constructor() { }

    public getApiName(): string {
        return 'GetGalleryByCategoryID';
    }

    public getRequestData(): ApiRequest {
        let queryParams = new HttpParams();
        let requestData = new ApiRequest();
        queryParams = queryParams.set('page', 
                      StringUtils.coerceStringProperty(this.page));
queryParams = queryParams.set('fileType', 
                      StringUtils.coerceStringProperty(this.fileType));
queryParams = queryParams.set('fileName', 
                      StringUtils.coerceStringProperty(this.fileName));

        requestData.type = 'GET';
        requestData.params = queryParams;
        requestData.url = this.url;
        return requestData;
    }

    public getMockPath(): string {
        return './assets/mock/GetGalleryByCategoryIDAPI.json';
    }

}