import { Injectable, Inject } from '@angular/core';
import { Observable, from} from 'rxjs';
import { APIFactory, APIDispatch, ConfigToken } from '@neux/core';
import { map, switchMap } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { GetGalleryByCategoryIDAPI } from './api/GetGalleryByCategoryIDAPI';
import { GetGalleryCategoryAPI } from './api/GetGalleryCategoryAPI';
import { PostLoginAPI } from './api/PostLoginAPI';
import { GetDepartmentAPI } from './api/GetDepartmentAPI';
import { DeleteGalleryCategoryByCategoryIDAPI } from './api/DeleteGalleryCategoryByCategoryIDAPI';
import { PutGalleryCategoryByCategoryIDAPI } from './api/PutGalleryCategoryByCategoryIDAPI';
import { PostGalleryCategoryByCategoryIDAPI } from './api/PostGalleryCategoryByCategoryIDAPI';
import { GetMenuByUserIDAPI } from './api/GetMenuByUserIDAPI';
import { GetLogoutAPI } from './api/GetLogoutAPI';
import { PutDepartmentByDeptIDAPI } from './api/PutDepartmentByDeptIDAPI';
import { DeleteDepartmentByDeptIDAPI } from './api/DeleteDepartmentByDeptIDAPI';
import { PostDepartmentByDeptIDAPI } from './api/PostDepartmentByDeptIDAPI';
import { GetAuditingAPI } from './api/GetAuditingAPI';
import { GetAuditingByOrderIDAPI } from './api/GetAuditingByOrderIDAPI';
import { PostAuditingByOrderIDAPI } from './api/PostAuditingByOrderIDAPI';

import { GalleryGetResponse } from './bean/GalleryGetResponse';
import { GalleryCaregoryGetResponse } from './bean/GalleryCaregoryGetResponse';
import { LoginResponse } from './bean/LoginResponse';
import { DepartmentGetResponse } from './bean/DepartmentGetResponse';
import { GenerationHeader } from './bean/GenerationHeader';
import { MenuGetResponse } from './bean/MenuGetResponse';
import { LogoutResponse } from './bean/LogoutResponse';
import { AuditingGetResponse } from './bean/AuditingGetResponse';
import { AuditingDetailGetResponse } from './bean/AuditingDetailGetResponse';


const APIResponseMap= {
    GetGalleryByCategoryID: GalleryGetResponse,
GetGalleryCategory: GalleryCaregoryGetResponse,
PostLogin: LoginResponse,
GetDepartment: DepartmentGetResponse,
DeleteGalleryCategoryByCategoryID: GenerationHeader,
PutGalleryCategoryByCategoryID: GenerationHeader,
PostGalleryCategoryByCategoryID: GenerationHeader,
GetMenuByUserID: MenuGetResponse,
GetLogout: LogoutResponse,
PutDepartmentByDeptID: GenerationHeader,
DeleteDepartmentByDeptID: GenerationHeader,
PostDepartmentByDeptID: GenerationHeader,
GetAuditing: AuditingGetResponse,
GetAuditingByOrderID: AuditingDetailGetResponse,
PostAuditingByOrderID: GenerationHeader,

}

@Injectable({
    providedIn: 'root'
})
export class RestApiService {

    constructor(
        private ApiFactory: APIFactory,
        private dispatcher: APIDispatch,
        @Inject(ConfigToken) private appConfig: any
    ) {
        this.ApiFactory.registerAPI(new GetGalleryByCategoryIDAPI());
this.ApiFactory.registerAPI(new GetGalleryCategoryAPI());
this.ApiFactory.registerAPI(new PostLoginAPI());
this.ApiFactory.registerAPI(new GetDepartmentAPI());
this.ApiFactory.registerAPI(new DeleteGalleryCategoryByCategoryIDAPI());
this.ApiFactory.registerAPI(new PutGalleryCategoryByCategoryIDAPI());
this.ApiFactory.registerAPI(new PostGalleryCategoryByCategoryIDAPI());
this.ApiFactory.registerAPI(new GetMenuByUserIDAPI());
this.ApiFactory.registerAPI(new GetLogoutAPI());
this.ApiFactory.registerAPI(new PutDepartmentByDeptIDAPI());
this.ApiFactory.registerAPI(new DeleteDepartmentByDeptIDAPI());
this.ApiFactory.registerAPI(new PostDepartmentByDeptIDAPI());
this.ApiFactory.registerAPI(new GetAuditingAPI());
this.ApiFactory.registerAPI(new GetAuditingByOrderIDAPI());
this.ApiFactory.registerAPI(new PostAuditingByOrderIDAPI());

    }

    public dispatchRestApi(name: string, params: any): Observable<any> {
        const restAPI = this.ApiFactory.getAPI(name);
        this.setAPIParams(restAPI, params);
        this.setUrl(restAPI, params);
        return this.dispatcher.dispatch(restAPI).pipe(
            map(x => {
                x['_body'] = plainToClass(APIResponseMap[name], x.body);
                return x;
            }),
            switchMap(x => from(this.validateBodyClass(x)))
        );
    }

    private setAPIParams(api: any, params: any) {
        for (let key in params) {
            api[key] = params[key];
        }
    }

    private setUrl(api: any, params: any) {
        let _url = this.appConfig.API_URL[api.getAPIName()];
        for (let key in params) {
            _url = _url.replace(new RegExp(`{${key}}`, 'g'), params[key]);
        }
        api.url = _url;
    }

    private async validateBodyClass(obj) {
        try {
            console.log(obj)
            await validateOrReject(obj.body);
            return obj;
        } catch (error) {
            throw error;
        }
    }

}