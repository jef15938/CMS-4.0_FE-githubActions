import { Api, MockApi, RestfulApi, ApiRequest } from '@neux/core';
import { HttpParams } from '@angular/common/http';
import { StringUtils } from '@neux/core';


/**
 * GetFarmPreview
 */
export class GetFarmPreviewByFuncIDAPI implements Api, MockApi, RestfulApi {

    public url:string;
    public dataID: string;


    constructor() { }

    public getApiName(): string {
        return 'GetFarmPreviewByFuncID';
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
        return './assets/mock/GetFarmPreviewByFuncIDAPI.json';
    }

}