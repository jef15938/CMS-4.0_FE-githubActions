import { Injectable, Inject } from '@angular/core';
import { Observable, from} from 'rxjs';
import { APIFactory, APIDispatch, ConfigGetter, AppConfig } from '@neux/core';
import { map, switchMap } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { GetGalleryByCategoryIDAPI } from './api/GetGalleryByCategoryIDAPI';
import { GetGalleryCategoryAPI } from './api/GetGalleryCategoryAPI';
import { PostGalleryCategoryAPI } from './api/PostGalleryCategoryAPI';
import { PostLoginAPI } from './api/PostLoginAPI';
import { GetDepartmentAPI } from './api/GetDepartmentAPI';
import { DeleteGalleryCategoryByCategoryIDAPI } from './api/DeleteGalleryCategoryByCategoryIDAPI';
import { PutGalleryCategoryByCategoryIDAPI } from './api/PutGalleryCategoryByCategoryIDAPI';
import { GetUserMenuAPI } from './api/GetUserMenuAPI';
import { GetLogoutAPI } from './api/GetLogoutAPI';
import { PutDepartmentByDeptIDAPI } from './api/PutDepartmentByDeptIDAPI';
import { DeleteDepartmentByDeptIDAPI } from './api/DeleteDepartmentByDeptIDAPI';
import { PostDepartmentByDeptIDAPI } from './api/PostDepartmentByDeptIDAPI';
import { GetAuditingAPI } from './api/GetAuditingAPI';
import { GetAuditingByOrderIDAPI } from './api/GetAuditingByOrderIDAPI';
import { PostAuditingByOrderIDAPI } from './api/PostAuditingByOrderIDAPI';
import { GetLoginInfoAPI } from './api/GetLoginInfoAPI';
import { GetCMSSiteMapBySiteIDAPI } from './api/GetCMSSiteMapBySiteIDAPI';
import { GetCMSMenuAPI } from './api/GetCMSMenuAPI';
import { GetUserSiteMapBySiteIDAPI } from './api/GetUserSiteMapBySiteIDAPI';
import { PostUserSiteMapBySiteIDAPI } from './api/PostUserSiteMapBySiteIDAPI';
import { PutUserSiteMapByNodeIDAPI } from './api/PutUserSiteMapByNodeIDAPI';
import { DeleteUserSiteMapByNodeIDAPI } from './api/DeleteUserSiteMapByNodeIDAPI';

import { GalleryGetResponse } from './bean/GalleryGetResponse';
import { GalleryCaregoryGetResponse } from './bean/GalleryCaregoryGetResponse';
import { GenerationHeader } from './bean/GenerationHeader';
import { LoginResponse } from './bean/LoginResponse';
import { DepartmentGetResponse } from './bean/DepartmentGetResponse';
import { MenuGetResponse } from './bean/MenuGetResponse';
import { LogoutResponse } from './bean/LogoutResponse';
import { AuditingGetResponse } from './bean/AuditingGetResponse';
import { AuditingDetailGetResponse } from './bean/AuditingDetailGetResponse';
import { SiteMapGetResponse } from './bean/SiteMapGetResponse';


const APIResponseMap= {
    GetGalleryByCategoryID: GalleryGetResponse,
GetGalleryCategory: GalleryCaregoryGetResponse,
PostGalleryCategory: GenerationHeader,
PostLogin: LoginResponse,
GetDepartment: DepartmentGetResponse,
DeleteGalleryCategoryByCategoryID: GenerationHeader,
PutGalleryCategoryByCategoryID: GenerationHeader,
GetUserMenu: MenuGetResponse,
GetLogout: LogoutResponse,
PutDepartmentByDeptID: GenerationHeader,
DeleteDepartmentByDeptID: GenerationHeader,
PostDepartmentByDeptID: GenerationHeader,
GetAuditing: AuditingGetResponse,
GetAuditingByOrderID: AuditingDetailGetResponse,
PostAuditingByOrderID: GenerationHeader,
GetLoginInfo: LoginResponse,
GetCMSSiteMapBySiteID: SiteMapGetResponse,
GetCMSMenu: MenuGetResponse,
GetUserSiteMapBySiteID: SiteMapGetResponse,
PostUserSiteMapBySiteID: GenerationHeader,
PutUserSiteMapByNodeID: GenerationHeader,
DeleteUserSiteMapByNodeID: GenerationHeader,

}

@Injectable({
    providedIn: 'root'
})
export class RestApiService {

    private appConfig: AppConfig;

    constructor(
        private ApiFactory: APIFactory,
        private dispatcher: APIDispatch,
        private configGetter: ConfigGetter,
    ) {
        this.appConfig = this.configGetter.getAppConfig();
        this.ApiFactory.registerAPI(new GetGalleryByCategoryIDAPI());
this.ApiFactory.registerAPI(new GetGalleryCategoryAPI());
this.ApiFactory.registerAPI(new PostGalleryCategoryAPI());
this.ApiFactory.registerAPI(new PostLoginAPI());
this.ApiFactory.registerAPI(new GetDepartmentAPI());
this.ApiFactory.registerAPI(new DeleteGalleryCategoryByCategoryIDAPI());
this.ApiFactory.registerAPI(new PutGalleryCategoryByCategoryIDAPI());
this.ApiFactory.registerAPI(new GetUserMenuAPI());
this.ApiFactory.registerAPI(new GetLogoutAPI());
this.ApiFactory.registerAPI(new PutDepartmentByDeptIDAPI());
this.ApiFactory.registerAPI(new DeleteDepartmentByDeptIDAPI());
this.ApiFactory.registerAPI(new PostDepartmentByDeptIDAPI());
this.ApiFactory.registerAPI(new GetAuditingAPI());
this.ApiFactory.registerAPI(new GetAuditingByOrderIDAPI());
this.ApiFactory.registerAPI(new PostAuditingByOrderIDAPI());
this.ApiFactory.registerAPI(new GetLoginInfoAPI());
this.ApiFactory.registerAPI(new GetCMSSiteMapBySiteIDAPI());
this.ApiFactory.registerAPI(new GetCMSMenuAPI());
this.ApiFactory.registerAPI(new GetUserSiteMapBySiteIDAPI());
this.ApiFactory.registerAPI(new PostUserSiteMapBySiteIDAPI());
this.ApiFactory.registerAPI(new PutUserSiteMapByNodeIDAPI());
this.ApiFactory.registerAPI(new DeleteUserSiteMapByNodeIDAPI());

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