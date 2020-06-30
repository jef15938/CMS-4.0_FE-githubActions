import { Api, MockApi, RestfulApi, ApiRequest } from '@neux/core';
import { HttpParams } from '@angular/common/http';
import { StringUtils } from '@neux/core';


/**
 * CreateFarmForm
 */
export class PostFarmFormInfoByFuncIDAPI implements Api, MockApi, RestfulApi {

    public url:string;
    

    constructor() { }

    public getApiName(): string {
        return 'PostFarmFormInfoByFuncID';
    }

    public getRequestData(): ApiRequest {
        let queryParams = new HttpParams();
        let requestData = new ApiRequest();
        
        requestData.type = 'POST';
        requestData.params = queryParams;
        requestData.url = this.url;
        return requestData;
    }

    public getMockPath(): string {
        return './assets/mock/PostFarmFormInfoByFuncIDAPI.json';
    }

}