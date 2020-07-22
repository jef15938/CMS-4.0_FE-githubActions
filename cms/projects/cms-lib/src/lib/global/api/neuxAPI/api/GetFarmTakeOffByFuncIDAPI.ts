import { Api, MockApi, RestfulApi, ApiRequest } from '@neux/core';
import { HttpParams } from '@angular/common/http';
import { StringUtils } from '@neux/core';


/**
 * TakeOffFarmData
 */
export class GetFarmTakeOffByFuncIDAPI implements Api, MockApi, RestfulApi {

    public url:string;
    public dataID: string;


    constructor() { }

    public getApiName(): string {
        return 'GetFarmTakeOffByFuncID';
    }

    public getRequestData(): ApiRequest {
        let queryParams = new HttpParams();
        let requestData = new ApiRequest();
        queryParams = queryParams.set('dataID', 
                      StringUtils.coerceStringProperty(this.dataID));

        requestData.type = 'GET';
        requestData.params = queryParams;
        requestData.url = this.url;
        return requestData;
    }

    public getMockPath(): string {
        return './assets/mock/GetFarmTakeOffByFuncIDAPI.json';
    }

}