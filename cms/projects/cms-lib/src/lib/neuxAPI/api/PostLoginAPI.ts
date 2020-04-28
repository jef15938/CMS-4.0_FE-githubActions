import { API, MockAPI, RestfulAPI, APIRequest } from '@neux/core';
import { HttpParams } from '@angular/common/http';
import { StringUtils } from '@neux/core';
import {LoginRequest} from '../bean/LoginRequest';


/**
 * Login
 */
export class PostLoginAPI implements API, MockAPI, RestfulAPI {

    public url:string;
    public requestBody: LoginRequest;


    constructor() { }

    public getAPIName(): string {
        return 'PostLogin';
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
        return './assets/mock/PostLoginAPI.json';
    }

}