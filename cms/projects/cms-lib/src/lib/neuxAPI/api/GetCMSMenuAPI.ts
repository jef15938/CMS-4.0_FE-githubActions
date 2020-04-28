import { API, MockAPI, RestfulAPI, APIRequest } from '@neux/core';
import { HttpParams } from '@angular/common/http';
import { StringUtils } from '@neux/core';


/**
 * GetCMSAllMenu
 */
export class GetCMSMenuAPI implements API, MockAPI, RestfulAPI {

    public url:string;
    

    constructor() { }

    public getAPIName(): string {
        return 'GetCMSMenu';
    }

    public getRequestData(): APIRequest {
        let queryParams = new HttpParams();
        let requestData = new APIRequest();
        
        requestData.type = 'GET';
        requestData.params = queryParams;
        requestData.url = this.url;
        return requestData;
    }

    public getMockPath(): string {
        return './assets/mock/GetCMSMenuAPI.json';
    }

}