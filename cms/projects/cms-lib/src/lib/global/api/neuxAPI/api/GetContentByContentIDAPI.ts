import { API, MockAPI, RestfulAPI, APIRequest } from '@neux/core';
import { HttpParams } from '@angular/common/http';
import { StringUtils } from '@neux/core';


/**
 * GetContent
 */
export class GetContentByContentIDAPI implements API, MockAPI, RestfulAPI {

    public url:string;
    public version: number;


    constructor() { }

    public getAPIName(): string {
        return 'GetContentByContentID';
    }

    public getRequestData(): APIRequest {
        let queryParams = new HttpParams();
        let requestData = new APIRequest();
        queryParams = queryParams.set('version', 
                      StringUtils.coerceStringProperty(this.version));

        requestData.type = 'GET';
        requestData.params = queryParams;
        requestData.url = this.url;
        return requestData;
    }

    public getMockPath(): string {
        return './assets/mock/GetContentByContentIDAPI.json';
    }

}