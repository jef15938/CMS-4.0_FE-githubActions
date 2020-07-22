import { Injectable, Inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import { ApiFactory, ApiDispatch, ConfigGetter, ApiConfig } from '@neux/core';
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
import { PostFarmAuditingByFuncIdAPI } from './api/PostFarmAuditingByFuncIdAPI';
import { GetFarmDetailInfoByFuncIDAPI } from './api/GetFarmDetailInfoByFuncIDAPI';
import { GetSiteAPI } from './api/GetSiteAPI';
import { GetSiteBySiteIDAPI } from './api/GetSiteBySiteIDAPI';
import { GetSiteBySiteIDAndNodeIDAPI } from './api/GetSiteBySiteIDAndNodeIDAPI';
import { GetGroupMenuByGroupIDAPI } from './api/GetGroupMenuByGroupIDAPI';
import { GetGroupSiteMapByGroupIDAPI } from './api/GetGroupSiteMapByGroupIDAPI';
import { GetTemplateByControlIDAPI } from './api/GetTemplateByControlIDAPI';
import { DeleteGalleryByGalleryIDAPI } from './api/DeleteGalleryByGalleryIDAPI';
import { PostSitemapAuditingByNodeIdAPI } from './api/PostSitemapAuditingByNodeIdAPI';
import { GetLayoutAPI } from './api/GetLayoutAPI';
import { GetFarmTakeOffByFuncIDAPI } from './api/GetFarmTakeOffByFuncIDAPI';

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
import { SiteMapNodeInfo } from './bean/SiteMapNodeInfo';
import { GroupMenuGetResponse } from './bean/GroupMenuGetResponse';
import { GroupSiteMapGetResponse } from './bean/GroupSiteMapGetResponse';
import { TemplateGetResponse } from './bean/TemplateGetResponse';
import { LayoutGetResponse } from './bean/LayoutGetResponse';


const APIResponseMap = {
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
  PostFarmAuditingByFuncId: GenerationHeader,
  GetFarmDetailInfoByFuncID: FarmFormInfo,
  GetSite: SiteGetResponse,
  GetSiteBySiteID: SiteMapGetResponse,
  GetSiteBySiteIDAndNodeID: SiteMapNodeInfo,
  GetGroupMenuByGroupID: GroupMenuGetResponse,
  GetGroupSiteMapByGroupID: GroupSiteMapGetResponse,
  GetTemplateByControlID: TemplateGetResponse,
  DeleteGalleryByGalleryID: GenerationHeader,
  PostSitemapAuditingByNodeId: GenerationHeader,
  GetLayout: LayoutGetResponse,
  GetFarmTakeOffByFuncID: GenerationHeader,

};

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  private apiConfig: ApiConfig;

  constructor(
    private apiFactory: ApiFactory,
    private dispatcher: ApiDispatch,
    private configGetter: ConfigGetter,
  ) {
    this.apiConfig = this.configGetter.getApiConfig();
    this.apiFactory.registerApi(new GetGalleryByCategoryIDAPI());
    this.apiFactory.registerApi(new GetGalleryCategoryAPI());
    this.apiFactory.registerApi(new PostGalleryCategoryAPI());
    this.apiFactory.registerApi(new PostLoginAPI());
    this.apiFactory.registerApi(new GetDepartmentAPI());
    this.apiFactory.registerApi(new DeleteGalleryCategoryByCategoryIDAPI());
    this.apiFactory.registerApi(new PutGalleryCategoryByCategoryIDAPI());
    this.apiFactory.registerApi(new GetUserMenuAPI());
    this.apiFactory.registerApi(new GetLogoutAPI());
    this.apiFactory.registerApi(new PutDepartmentByDeptIDAPI());
    this.apiFactory.registerApi(new DeleteDepartmentByDeptIDAPI());
    this.apiFactory.registerApi(new PostDepartmentByDeptIDAPI());
    this.apiFactory.registerApi(new GetDepartmentByDeptIDAPI());
    this.apiFactory.registerApi(new GetAuditingAPI());
    this.apiFactory.registerApi(new PostAuditingByOrderIDAPI());
    this.apiFactory.registerApi(new GetLoginInfoAPI());
    this.apiFactory.registerApi(new GetCMSMenuAPI());
    this.apiFactory.registerApi(new GetUserSiteMapBySiteIDAPI());
    this.apiFactory.registerApi(new PostUserSiteMapBySiteIDAPI());
    this.apiFactory.registerApi(new PutUserSiteMapByNodeIDAPI());
    this.apiFactory.registerApi(new DeleteUserSiteMapByNodeIDAPI());
    this.apiFactory.registerApi(new GetContentByContentIDAPI());
    this.apiFactory.registerApi(new PutContentByContentIDAPI());
    this.apiFactory.registerApi(new GetMyAuditingByOrderIDAPI());
    this.apiFactory.registerApi(new GetMyAuditingAPI());
    this.apiFactory.registerApi(new GetFarmByFuncIDAPI());
    this.apiFactory.registerApi(new GetFarmTableInfoByFuncIDAPI());
    this.apiFactory.registerApi(new GetFarmFormInfoByFuncIDAPI());
    this.apiFactory.registerApi(new PostFarmFormInfoByFuncIDAPI());
    this.apiFactory.registerApi(new PutFarmFormInfoByFuncIDAPI());
    this.apiFactory.registerApi(new PostFarmAuditingByFuncIdAPI());
    this.apiFactory.registerApi(new GetFarmDetailInfoByFuncIDAPI());
    this.apiFactory.registerApi(new GetSiteAPI());
    this.apiFactory.registerApi(new GetSiteBySiteIDAPI());
    this.apiFactory.registerApi(new GetSiteBySiteIDAndNodeIDAPI());
    this.apiFactory.registerApi(new GetGroupMenuByGroupIDAPI());
    this.apiFactory.registerApi(new GetGroupSiteMapByGroupIDAPI());
    this.apiFactory.registerApi(new GetTemplateByControlIDAPI());
    this.apiFactory.registerApi(new DeleteGalleryByGalleryIDAPI());
    this.apiFactory.registerApi(new PostSitemapAuditingByNodeIdAPI());
    this.apiFactory.registerApi(new GetLayoutAPI());
    this.apiFactory.registerApi(new GetFarmTakeOffByFuncIDAPI());

  }

  public dispatchRestApi<T>(name: string, params: any): Observable<T> {
    const restAPI = this.apiFactory.getApi(name);
    this.setAPIParams(restAPI, params);
    this.setUrl(restAPI, params);
    return this.dispatcher.dispatch(restAPI).pipe(
      map(x => {
        x._body = plainToClass(APIResponseMap[name], x.body);
        return x;
      }),
      switchMap(x => from(this.validateBodyClass(x))),
      map(x => x._body), // 因應res結構調整
    );
  }

  private setAPIParams(api: any, params: any) {
    for (const key in params) {
      api[key] = params[key];
    }
  }

  private setUrl(api: any, params: any) {
    let _url = this.apiConfig.API_URL[api.getApiName()];
    for (const key in params) {
      _url = _url.replace(new RegExp(`{${key}}`, 'g'), params[key]);
    }
    api.url = _url;
  }

  private async validateBodyClass(obj) {
    try {
      console.log(obj);
      await validateOrReject(obj.body);
      return obj;
    } catch (error) {
      throw error;
    }
  }

}
