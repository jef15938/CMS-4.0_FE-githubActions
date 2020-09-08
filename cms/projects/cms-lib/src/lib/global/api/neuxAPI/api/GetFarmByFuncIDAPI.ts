import { Api, MockApi, RestfulApi, ApiRequest } from '@neux/core';
import { HttpParams } from '@angular/common/http';
import { StringUtils } from '@neux/core';


/**
 * GetFarmInfo
 */
export class GetFarmByFuncIDAPI implements Api, MockApi, RestfulApi {

    public url:string;
    public dataID: string;
public parentID: string;


    constructor() { }

    public getApiName(): string {
        return 'GetFarmByFuncID';
    }

    public getRequestData(): ApiRequest {
        let queryParams = new HttpParams();
        let requestData = new ApiRequest();
        queryParams = queryParams.set('dataID', 
                      StringUtils.coerceStringProperty(this.dataID));
queryParams = queryParams.set('parentID', 
                      StringUtils.coerceStringProperty(this.parentID));

        requestData.type = 'GET';
        requestData.params = queryParams;
        requestData.url = this.url;
        return requestData;
    }

    public getMockPath(): string {
        return './assets/mock/GetFarmByFuncIDAPI.json';
    }

}