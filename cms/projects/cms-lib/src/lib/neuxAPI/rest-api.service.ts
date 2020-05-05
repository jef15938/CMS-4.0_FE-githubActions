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
import { GetDepartmentByDeptIDAPI } from './api/GetDepartmentByDeptIDAPI';
import { GetAuditingAPI } from './api/GetAuditingAPI';
import { PostAuditingByOrderIDAPI } from './api/PostAuditingByOrderIDAPI';
import { GetLoginInfoAPI } from './api/GetLoginInfoAPI';
import { GetCMSSiteMapBySiteIDAPI } from './api/GetCMSSiteMapBySiteIDAPI';
import { GetCMSMenuAPI } from './api/GetCMSMenuAPI';
import { GetUserSiteMapBySiteIDAPI } from './api/GetUserSiteMapBySiteIDAPI';
import { PostUserSiteMapBySiteIDAPI } from './api/PostUserSiteMapBySiteIDAPI';
import { PutUserSiteMapByNodeIDAPI } from './api/PutUserSiteMapByNodeIDAPI';
import { DeleteUserSiteMapByNodeIDAPI } from './api/DeleteUserSiteMapByNodeIDAPI';
import { GetContentByContentIDAPI } from './api/GetContentByContentIDAPI';
import { PutContentByContentIDAPI } from './api/PutContentByContentIDAPI';
import { GetMyAuditingByOrderIDAPI } from './api/GetMyAuditingByOrderIDAPI';
import { GetMyAuditingAPI } from './api/GetMyAuditingAPI';
import { GetFarmByFuncIDAPI } from './api/GetFarmByFuncIDAPI';
import { GetFarmTableInfoByFuncIDAPI } from './api/GetFarmTableInfoByFuncIDAPI';
import { GetFarmFormInfoByFuncIDAPI } from './api/GetFarmFormInfoByFuncIDAPI';
import { PostFarmFormInfoByFuncIDAPI } from './api/PostFarmFormInfoByFuncIDAPI';
import { PutFarmFormInfoByFuncIDAPI } from './api/PutFarmFormInfoByFuncIDAPI';
import { GetFarmDetailInfoByFarmIDAPI } from './api/GetFarmDetailInfoByFarmIDAPI';
import { GetSiteAPI } from './api/GetSiteAPI';
import { GetGroupMenuByGroupIDAPI } from './api/GetGroupMenuByGroupIDAPI';
import { GetGroupSiteMapByGroupIDAPI } from './api/GetGroupSiteMapByGroupIDAPI';

import { GalleryGetResponse } from './bean/GalleryGetResponse';
import { GalleryCaregoryGetResponse } from './bean/GalleryCaregoryGetResponse';
import { GenerationHeader } from './bean/GenerationHeader';
import { LoginResponse } from './bean/LoginResponse';
import { DepartmentGetResponse } from './bean/DepartmentGetResponse';
import { MenuGetResponse } from './bean/MenuGetResponse';
import { DepartmentDetailInfo } from './bean/DepartmentDetailInfo';
import { AuditingGetResponse } from './bean/AuditingGetResponse';
import { SiteMapGetResponse } from './bean/SiteMapGetResponse';
import { ContentInfo } from './bean/ContentInfo';
import { MyAuditingDetailGetResponse } from './bean/MyAuditingDetailGetResponse';
import { MyAuditingGetResponse } from './bean/MyAuditingGetResponse';
import { FarmInfoGetResponse } from './bean/FarmInfoGetResponse';
import { FarmTableInfo } from './bean/FarmTableInfo';
import { FarmFormInfo } from './bean/FarmFormInfo';
import { SiteGetResponse } from './bean/SiteGetResponse';
import { GroupMenuGetResponse } from './bean/GroupMenuGetResponse';
import { GroupSiteMapGetResponse } from './bean/GroupSiteMapGetResponse';


const APIResponseMap= {
    GetGalleryByCategoryID: GalleryGetResponse,
GetGalleryCategory: GalleryCaregoryGetResponse,
PostGalleryCategory: GenerationHeader,
PostLogin: LoginResponse,
GetDepartment: DepartmentGetResponse,
DeleteGalleryCategoryByCategoryID: GenerationHeader,
PutGalleryCategoryByCategoryID: GenerationHeader,
GetUserMenu: MenuGetResponse,
GetLogout: GenerationHeader,
PutDepartmentByDeptID: GenerationHeader,
DeleteDepartmentByDeptID: GenerationHeader,
PostDepartmentByDeptID: GenerationHeader,
GetDepartmentByDeptID: DepartmentDetailInfo,
GetAuditing: AuditingGetResponse,
PostAuditingByOrderID: GenerationHeader,
GetLoginInfo: LoginResponse,
GetCMSSiteMapBySiteID: SiteMapGetResponse,
GetCMSMenu: MenuGetResponse,
GetUserSiteMapBySiteID: SiteMapGetResponse,
PostUserSiteMapBySiteID: GenerationHeader,
PutUserSiteMapByNodeID: GenerationHeader,
DeleteUserSiteMapByNodeID: GenerationHeader,
GetContentByContentID: ContentInfo,
PutContentByContentID: GenerationHeader,
GetMyAuditingByOrderID: MyAuditingDetailGetResponse,
GetMyAuditing: MyAuditingGetResponse,
GetFarmByFuncID: FarmInfoGetResponse,
GetFarmTableInfoByFuncID: FarmTableInfo,
GetFarmFormInfoByFuncID: FarmFormInfo,
PostFarmFormInfoByFuncID: GenerationHeader,
PutFarmFormInfoByFuncID: GenerationHeader,
GetFarmDetailInfoByFarmID: FarmFormInfo,
GetSite: SiteGetResponse,
GetGroupMenuByGroupID: GroupMenuGetResponse,
GetGroupSiteMapByGroupID: GroupSiteMapGetResponse,

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
this.ApiFactory.registerAPI(new GetDepartmentByDeptIDAPI());
this.ApiFactory.registerAPI(new GetAuditingAPI());
this.ApiFactory.registerAPI(new PostAuditingByOrderIDAPI());
this.ApiFactory.registerAPI(new GetLoginInfoAPI());
this.ApiFactory.registerAPI(new GetCMSSiteMapBySiteIDAPI());
this.ApiFactory.registerAPI(new GetCMSMenuAPI());
this.ApiFactory.registerAPI(new GetUserSiteMapBySiteIDAPI());
this.ApiFactory.registerAPI(new PostUserSiteMapBySiteIDAPI());
this.ApiFactory.registerAPI(new PutUserSiteMapByNodeIDAPI());
this.ApiFactory.registerAPI(new DeleteUserSiteMapByNodeIDAPI());
this.ApiFactory.registerAPI(new GetContentByContentIDAPI());
this.ApiFactory.registerAPI(new PutContentByContentIDAPI());
this.ApiFactory.registerAPI(new GetMyAuditingByOrderIDAPI());
this.ApiFactory.registerAPI(new GetMyAuditingAPI());
this.ApiFactory.registerAPI(new GetFarmByFuncIDAPI());
this.ApiFactory.registerAPI(new GetFarmTableInfoByFuncIDAPI());
this.ApiFactory.registerAPI(new GetFarmFormInfoByFuncIDAPI());
this.ApiFactory.registerAPI(new PostFarmFormInfoByFuncIDAPI());
this.ApiFactory.registerAPI(new PutFarmFormInfoByFuncIDAPI());
this.ApiFactory.registerAPI(new GetFarmDetailInfoByFarmIDAPI());
this.ApiFactory.registerAPI(new GetSiteAPI());
this.ApiFactory.registerAPI(new GetGroupMenuByGroupIDAPI());
this.ApiFactory.registerAPI(new GetGroupSiteMapByGroupIDAPI());

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
            switchMap(x => from(this.validateBodyClass(x))),
            map(x => x['_body']), // 因應res結構調整，暫時先用此方式處理 // TODO: 調整lib相關程式
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