import { Api, MockApi, RestfulApi, ApiRequest } from '@neux/core';
import { HttpParams } from '@angular/common/http';
import { StringUtils } from '@neux/core';


/**
 * UpdateFarmForm
 */
export class PutFarmFormInfoByFuncIDAPI implements Api, MockApi, RestfulApi {

    public url:string;
    public dataID: string;
public requestBody: any;


    constructor() { }

    public getApiName(): string {
        return 'PutFarmFormInfoByFuncID';
    }

    public getRequestData(): ApiRequest {
        let queryParams = new HttpParams();
        let requestData = new ApiRequest();
        queryParams = queryParams.set('dataID', 
                      StringUtils.coerceStringProperty(this.dataID));
requestData.body = this.requestBody;

        requestData.type = 'PUT';
        requestData.params = queryParams;
        requestData.url = this.url;
        return requestData;
    }

    public getMockPath(): string {
        return './assets/mock/PutFarmFormInfoByFuncIDAPI.json';
    }

}