import { Api, MockApi, RestfulApi, ApiRequest } from '@neux/core';
import { HttpParams } from '@angular/common/http';
import { StringUtils } from '@neux/core';


/**
 * GetLoginUserCMSMenu
 */
export class GetUserMenuAPI implements Api, MockApi, RestfulApi {

    public url:string;
    

    constructor() { }

    public getApiName(): string {
        return 'GetUserMenu';
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
        return './assets/mock/GetUserMenuAPI.json';
    }

}