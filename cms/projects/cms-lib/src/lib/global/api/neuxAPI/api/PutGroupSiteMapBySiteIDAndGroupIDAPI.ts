import { Api, MockApi, RestfulApi, ApiRequest } from '@neux/core';
import { HttpParams } from '@angular/common/http';
import { StringUtils } from '@neux/core';
import {GroupSiteMapGetResponse} from '../bean/GroupSiteMapGetResponse';


/**
 * PutGroupSiteMapList
 */
export class PutGroupSiteMapBySiteIDAndGroupIDAPI implements Api, MockApi, RestfulApi {

    public url:string;
    public requestBody: GroupSiteMapGetResponse;


    constructor() { }

    public getApiName(): string {
        return 'PutGroupSiteMapBySiteIDAndGroupID';
    }

    public getRequestData(): ApiRequest {
        let queryParams = new HttpParams();
        let requestData = new ApiRequest();
        requestData.body = this.requestBody;

        requestData.type = 'PUT';
        requestData.params = queryParams;
        requestData.url = this.url;
        return requestData;
    }

    public getMockPath(): string {
        return './assets/mock/PutGroupSiteMapBySiteIDAndGroupIDAPI.json';
    }

}