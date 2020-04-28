import { API, MockAPI, RestfulAPI, APIRequest } from '@neux/core';
import { HttpParams } from '@angular/common/http';
import { StringUtils } from '@neux/core';
import {UserSiteMapPostRequest} from '../bean/UserSiteMapPostRequest';


/**
 * CreateSiteNode
 */
export class PostUserSiteMapBySiteIDAPI implements API, MockAPI, RestfulAPI {

    public url:string;
    public requestBody: UserSiteMapPostRequest;


    constructor() { }

    public getAPIName(): string {
        return 'PostUserSiteMapBySiteID';
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
        return './assets/mock/PostUserSiteMapBySiteIDAPI.json';
    }

}