import { Api, MockApi, RestfulApi, ApiRequest } from '@neux/core';
import { HttpParams } from '@angular/common/http';
import { StringUtils } from '@neux/core';


/**
 * GetTemplate
 */
export class GetTemplateByControlIDAPI implements Api, MockApi, RestfulApi {

    public url:string;
    

    constructor() { }

    public getApiName(): string {
        return 'GetTemplateByControlID';
    }

    public getRequestData(): ApiRequest {
        let queryParams = new HttpParams();
        let requestData = new ApiRequest();
        
        requestData.type = 'GET';
        requestData.params = queryParams;
        requestData.url = this.url;
        return requestData;
    }

    public getMockPath(): string {
        return './assets/mock/GetTemplateByControlIDAPI.json';
    }

}