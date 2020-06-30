import { API, MockAPI, RestfulAPI, APIRequest } from '@neux/core';
import { HttpParams } from '@angular/common/http';
import { StringUtils } from '@neux/core';


/**
 * GetFarmFormInfo
 */
export class GetFarmFormInfoByFuncIDAPI implements API, MockAPI, RestfulAPI {

    public url:string;
    public dataID: string;


    constructor() { }

    public getAPIName(): string {
        return 'GetFarmFormInfoByFuncID';
    }

    public getRequestData(): APIRequest {
        let queryParams = new HttpParams();
        let requestData = new APIRequest();
        queryParams = queryParams.set('dataID', 
                      StringUtils.coerceStringProperty(this.dataID));

        requestData.type = 'GET';
        requestData.params = queryParams;
        requestData.url = this.url;
        return requestData;
    }

    public getMockPath(): string {
        return './assets/mock/GetFarmFormInfoByFuncIDAPI.json';
    }

}