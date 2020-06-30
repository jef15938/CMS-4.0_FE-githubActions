import { Api, MockApi, RestfulApi, ApiRequest } from '@neux/core';
import { HttpParams } from '@angular/common/http';
import { StringUtils } from '@neux/core';
import {DepartmentMaintainRequest} from '../bean/DepartmentMaintainRequest';


/**
 * CreateDepartment
 */
export class PostDepartmentByDeptIDAPI implements Api, MockApi, RestfulApi {

    public url:string;
    public requestBody: DepartmentMaintainRequest;


    constructor() { }

    public getApiName(): string {
        return 'PostDepartmentByDeptID';
    }

    public getRequestData(): ApiRequest {
        let queryParams = new HttpParams();
        let requestData = new ApiRequest();
        requestData.body = this.requestBody;

        requestData.type = 'POST';
        requestData.params = queryParams;
        requestData.url = this.url;
        return requestData;
    }

    public getMockPath(): string {
        return './assets/mock/PostDepartmentByDeptIDAPI.json';
    }

}