import { Api, MockApi, RestfulApi, ApiRequest } from '@neux/core';
import { HttpParams } from '@angular/common/http';
import { StringUtils } from '@neux/core';


/**
 * GetSitemapPreview
 */
export class GetSitemapPreviewByNodeIDAPI implements Api, MockApi, RestfulApi {

    public url:string;
    public language_id: string;


    constructor() { }

    public getApiName(): string {
        return 'GetSitemapPreviewByNodeID';
    }

    public getRequestData(): ApiRequest {
        let queryParams = new HttpParams();
        let requestData = new ApiRequest();
        queryParams = queryParams.set('language_id', 
                      StringUtils.coerceStringProperty(this.language_id));

        requestData.type = 'GET';
        requestData.params = queryParams;
        requestData.url = this.url;
        return requestData;
    }

    public getMockPath(): string {
        return './assets/mock/GetSitemapPreviewByNodeIDAPI.json';
    }

}