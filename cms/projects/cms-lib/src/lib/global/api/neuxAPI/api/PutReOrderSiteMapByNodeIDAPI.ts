import { Api, MockApi, RestfulApi, ApiRequest } from '@neux/core';
import { HttpParams } from '@angular/common/http';
import { StringUtils } from '@neux/core';


/**
 * ReOrderSitemap
 */
export class PutReOrderSiteMapByNodeIDAPI implements Api, MockApi, RestfulApi {

    public url:string;
    public node_order: number;
public parent_id: string;
public requestBody: any;


    constructor() { }

    public getApiName(): string {
        return 'PutReOrderSiteMapByNodeID';
    }

    public getRequestData(): ApiRequest {
        let queryParams = new HttpParams();
        let requestData = new ApiRequest();
        queryParams = queryParams.set('node_order', 
                      StringUtils.coerceStringProperty(this.node_order));
queryParams = queryParams.set('parent_id', 
                      StringUtils.coerceStringProperty(this.parent_id));
requestData.body = this.requestBody;

        requestData.type = 'PUT';
        requestData.params = queryParams;
        requestData.url = this.url;
        return requestData;
    }

    public getMockPath(): string {
        return './assets/mock/PutReOrderSiteMapByNodeIDAPI.json';
    }

}