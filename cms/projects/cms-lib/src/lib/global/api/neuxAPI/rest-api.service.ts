import { Injectable, Inject } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ApiFactory, ApiDispatch, ConfigGetter, ApiConfig, ApiDispatchOptions } from '@neux/core';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { GalleryGetResponse } from './bean/GalleryGetResponse';
import { GenerationHeader } from './bean/GenerationHeader';
import { GalleryCaregoryGetResponse } from './bean/GalleryCaregoryGetResponse';
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
import { PreviewInfo } from './bean/PreviewInfo';
import { SiteGetResponse } from './bean/SiteGetResponse';
import { SiteMapNodeGetResponse } from './bean/SiteMapNodeGetResponse';
import { GroupMenuGetResponse } from './bean/GroupMenuGetResponse';
import { GroupSiteMapGetResponse } from './bean/GroupSiteMapGetResponse';
import { TemplateGetResponse } from './bean/TemplateGetResponse';
import { SaveGalleryResponse } from './bean/SaveGalleryResponse';
import { LayoutGetResponse } from './bean/LayoutGetResponse';
import { ListContentDataSourceResponse } from './bean/ListContentDataSourceResponse';
import { ListContentVersionResponse } from './bean/ListContentVersionResponse';
import { ListFarmTriggerDataResponse } from './bean/ListFarmTriggerDataResponse';
import { GetFarmTreeResponse } from './bean/GetFarmTreeResponse';
import { ListGroupResponst } from './bean/ListGroupResponst';
import { GalleryConfigResponse } from './bean/GalleryConfigResponse';
import { GetSliderTypeRangeResponse } from './bean/GetSliderTypeRangeResponse';
import { GetGallerySettingResponse } from './bean/GetGallerySettingResponse';
import { SaveFileResponse } from './bean/SaveFileResponse';
import { ListFormTypeResponse } from './bean/ListFormTypeResponse';
import { ListFilesResponse } from './bean/ListFilesResponse';

import { GalleryCategoryPutRequest } from './bean/GalleryCategoryPutRequest';
import { LoginRequest } from './bean/LoginRequest';
import { DepartmentMaintainRequest } from './bean/DepartmentMaintainRequest';
import { AuditingSubmitRequest } from './bean/AuditingSubmitRequest';
import { UserSiteMapPostRequest } from './bean/UserSiteMapPostRequest';
import { UserSiteMapPutRequest } from './bean/UserSiteMapPutRequest';
import { FarmAuditingRequest } from './bean/FarmAuditingRequest';
import { SitemapAuditingRequest } from './bean/SitemapAuditingRequest';

export function RestApi(config: {
  apiName: string, method: string, path: string, mock: string, responseType: any,
}) {
  const func = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    descriptor.value = function(params: { [key: string]: any }, apiDispatchOptions?: ApiDispatchOptions) {
      console.log(`RestApi ${propertyKey}()`, config, { params, apiDispatchOptions });
      return (this as any).dispatch(
        config.apiName, config.method, config.path, config.mock, params, config.responseType, apiDispatchOptions
      );
    };
  };
  return func;
}

@Injectable({
    providedIn: 'root'
})
export class RestApiService {

  private apiConfig: ApiConfig;

  constructor(
    private apiFactory: ApiFactory,
    private dispatcher: ApiDispatch,
    private configGetter: ConfigGetter,
    @Inject('API_BASE_URL') private apiBaseUrl: string,
  ) {
    this.apiConfig = this.configGetter.getApiConfig();
  }
  
  // @dynamic
  @RestApi({
    apiName: 'GetGalleryByCategoryID',
    method: 'get',
    path: '/Gallery/{categoryID}',
    mock: './assets/mock/GetGalleryByCategoryID.json',
    responseType: GalleryGetResponse
  })
  GetGallery(
    params: { categoryID: string, page?: number, fileType?: string, fileName?: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<GalleryGetResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'PostGalleryByCategoryID',
    method: 'post',
    path: '/Gallery/{categoryID}',
    mock: './assets/mock/PostGalleryByCategoryID.json',
    responseType: GenerationHeader
  })
  CreateGallery(
    params: { categoryID: string, requestBody: any },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<GenerationHeader> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetGalleryCategory',
    method: 'get',
    path: '/GalleryCategory',
    mock: './assets/mock/GetGalleryCategory.json',
    responseType: GalleryCaregoryGetResponse
  })
  GetGalleryCategory(
    params: {},
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<GalleryCaregoryGetResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'PostGalleryCategory',
    method: 'post',
    path: '/GalleryCategory',
    mock: './assets/mock/PostGalleryCategory.json',
    responseType: GenerationHeader
  })
  CreateGalleryCategory(
    params: { requestBody: GalleryCategoryPutRequest },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<GenerationHeader> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'PostLogin',
    method: 'post',
    path: '/Login',
    mock: './assets/mock/PostLogin.json',
    responseType: LoginResponse
  })
  Login(
    params: { requestBody: LoginRequest },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<LoginResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetDepartment',
    method: 'get',
    path: '/Department',
    mock: './assets/mock/GetDepartment.json',
    responseType: DepartmentGetResponse
  })
  GetDepartment(
    params: {},
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<DepartmentGetResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'DeleteGalleryCategoryByCategoryID',
    method: 'delete',
    path: '/GalleryCategory/{categoryID}',
    mock: './assets/mock/DeleteGalleryCategoryByCategoryID.json',
    responseType: GenerationHeader
  })
  DeleteGalleryCategory(
    params: { categoryID: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<GenerationHeader> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'PutGalleryCategoryByCategoryID',
    method: 'put',
    path: '/GalleryCategory/{categoryID}',
    mock: './assets/mock/PutGalleryCategoryByCategoryID.json',
    responseType: GenerationHeader
  })
  UpdateGalleryCategory(
    params: { categoryID: string, requestBody: GalleryCategoryPutRequest },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<GenerationHeader> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetUserMenu',
    method: 'get',
    path: '/UserMenu',
    mock: './assets/mock/GetUserMenu.json',
    responseType: MenuGetResponse
  })
  GetLoginUserCMSMenu(
    params: {},
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<MenuGetResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetLogout',
    method: 'get',
    path: '/Logout',
    mock: './assets/mock/GetLogout.json',
    responseType: GenerationHeader
  })
  Logout(
    params: {},
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<GenerationHeader> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'PutDepartmentByDeptID',
    method: 'put',
    path: '/Department/{deptID}',
    mock: './assets/mock/PutDepartmentByDeptID.json',
    responseType: GenerationHeader
  })
  UpdateDepartment(
    params: { deptID: string, requestBody: DepartmentMaintainRequest },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<GenerationHeader> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'DeleteDepartmentByDeptID',
    method: 'delete',
    path: '/Department/{deptID}',
    mock: './assets/mock/DeleteDepartmentByDeptID.json',
    responseType: GenerationHeader
  })
  DeleteDepartment(
    params: { deptID: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<GenerationHeader> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'PostDepartmentByDeptID',
    method: 'post',
    path: '/Department/{deptID}',
    mock: './assets/mock/PostDepartmentByDeptID.json',
    responseType: GenerationHeader
  })
  CreateDepartment(
    params: { deptID: string, requestBody: DepartmentMaintainRequest },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<GenerationHeader> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetDepartmentByDeptID',
    method: 'get',
    path: '/Department/{deptID}',
    mock: './assets/mock/GetDepartmentByDeptID.json',
    responseType: DepartmentDetailInfo
  })
  GetDepartmentInfo(
    params: { deptID: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<DepartmentDetailInfo> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetAuditing',
    method: 'get',
    path: '/Auditing',
    mock: './assets/mock/GetAuditing.json',
    responseType: AuditingGetResponse
  })
  GetAuditingList(
    params: { page?: number, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<AuditingGetResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'PostAuditingByOrderID',
    method: 'post',
    path: '/Auditing/{orderID}',
    mock: './assets/mock/PostAuditingByOrderID.json',
    responseType: GenerationHeader
  })
  ApproveAuditing(
    params: { orderID: number, requestBody: AuditingSubmitRequest },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<GenerationHeader> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetLoginInfo',
    method: 'get',
    path: '/LoginInfo',
    mock: './assets/mock/GetLoginInfo.json',
    responseType: LoginResponse
  })
  GetLoginInfo(
    params: {},
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<LoginResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetCMSMenu',
    method: 'get',
    path: '/CMSMenu',
    mock: './assets/mock/GetCMSMenu.json',
    responseType: MenuGetResponse
  })
  GetCMSAllMenu(
    params: {},
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<MenuGetResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetUserSiteMapBySiteID',
    method: 'get',
    path: '/UserSiteMap/{siteID}',
    mock: './assets/mock/GetUserSiteMapBySiteID.json',
    responseType: SiteMapGetResponse
  })
  GetUserSiteMap(
    params: { siteID: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<SiteMapGetResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'PostUserSiteMapBySiteID',
    method: 'post',
    path: '/UserSiteMap/{siteID}',
    mock: './assets/mock/PostUserSiteMapBySiteID.json',
    responseType: GenerationHeader
  })
  CreateSiteNode(
    params: { siteID: string, requestBody: UserSiteMapPostRequest },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<GenerationHeader> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'PutUserSiteMapByNodeID',
    method: 'put',
    path: '/UserSiteMap/{nodeID}',
    mock: './assets/mock/PutUserSiteMapByNodeID.json',
    responseType: GenerationHeader
  })
  UpdateUserSiteMap(
    params: { nodeID: string, requestBody: UserSiteMapPutRequest },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<GenerationHeader> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'DeleteUserSiteMapByNodeID',
    method: 'delete',
    path: '/UserSiteMap/{nodeID}',
    mock: './assets/mock/DeleteUserSiteMapByNodeID.json',
    responseType: GenerationHeader
  })
  DeleteUserSiteMap(
    params: { nodeID: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<GenerationHeader> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetContentById',
    method: 'get',
    path: '/Content/{id}',
    mock: './assets/mock/GetContentById.json',
    responseType: ContentInfo
  })
  GetContent(
    params: { id: string, version?: number, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<ContentInfo> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'PutContentById',
    method: 'put',
    path: '/Content/{id}',
    mock: './assets/mock/PutContentById.json',
    responseType: GenerationHeader
  })
  UpdateContent(
    params: { id: string, requestBody: ContentInfo },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<GenerationHeader> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetSitemapContentBySiteIdAndNodeId',
    method: 'get',
    path: '/SitemapContent/{siteId}/{nodeId}',
    mock: './assets/mock/GetSitemapContentBySiteIdAndNodeId.json',
    responseType: ContentInfo
  })
  GetSitemapContent(
    params: { siteId: string, nodeId: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<ContentInfo> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetMyAuditingByOrderID',
    method: 'get',
    path: '/MyAuditing/{orderID}',
    mock: './assets/mock/GetMyAuditingByOrderID.json',
    responseType: MyAuditingDetailGetResponse
  })
  GetMyAuditingDetail(
    params: { orderID: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<MyAuditingDetailGetResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetMyAuditing',
    method: 'get',
    path: '/MyAuditing',
    mock: './assets/mock/GetMyAuditing.json',
    responseType: MyAuditingGetResponse
  })
  GetMyAuditing(
    params: { page?: number, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<MyAuditingGetResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetFarmByFuncID',
    method: 'get',
    path: '/Farm/{funcID}',
    mock: './assets/mock/GetFarmByFuncID.json',
    responseType: FarmInfoGetResponse
  })
  GetFarmInfo(
    params: { funcID: string, dataID?: string, parentID?: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<FarmInfoGetResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetFarmTableInfoByFuncID',
    method: 'get',
    path: '/FarmTableInfo/{funcID}',
    mock: './assets/mock/GetFarmTableInfoByFuncID.json',
    responseType: FarmTableInfo
  })
  GetFarmTableInfo(
    params: { funcID: string, page?: number, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<FarmTableInfo> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetFarmFormInfoByFuncID',
    method: 'get',
    path: '/FarmFormInfo/{funcID}',
    mock: './assets/mock/GetFarmFormInfoByFuncID.json',
    responseType: FarmFormInfo
  })
  GetFarmFormInfo(
    params: { funcID: string, dataID?: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<FarmFormInfo> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'PostFarmFormInfoByFuncID',
    method: 'post',
    path: '/FarmFormInfo/{funcID}',
    mock: './assets/mock/PostFarmFormInfoByFuncID.json',
    responseType: GenerationHeader
  })
  CreateFarmForm(
    params: { funcID: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<GenerationHeader> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'PutFarmFormInfoByFuncID',
    method: 'put',
    path: '/FarmFormInfo/{funcID}',
    mock: './assets/mock/PutFarmFormInfoByFuncID.json',
    responseType: GenerationHeader
  })
  UpdateFarmForm(
    params: { funcID: string, dataID: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<GenerationHeader> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'PostFarmAuditingByFuncId',
    method: 'post',
    path: '/FarmAuditing/{funcId}',
    mock: './assets/mock/PostFarmAuditingByFuncId.json',
    responseType: GenerationHeader
  })
  AuditingFarmData(
    params: { funcId: string, requestBody: FarmAuditingRequest },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<GenerationHeader> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetFarmDetailInfoByFuncID',
    method: 'get',
    path: '/FarmDetailInfo/{funcID}',
    mock: './assets/mock/GetFarmDetailInfoByFuncID.json',
    responseType: FarmFormInfo
  })
  GetFarmDetailInfo(
    params: { funcID: string, dataID: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<FarmFormInfo> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetFarmPreviewByFuncID',
    method: 'get',
    path: '/FarmPreview/{funcID}',
    mock: './assets/mock/GetFarmPreviewByFuncID.json',
    responseType: PreviewInfo
  })
  GetFarmPreview(
    params: { funcID: string, dataID: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<PreviewInfo> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetGalleryShowByGalleryID',
    method: 'get',
    path: '/Gallery/Show/{galleryID}',
    mock: './assets/mock/GetGalleryShowByGalleryID.json',
    responseType: null
  })
  GetGalleryShow(
    params: { galleryID: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<any> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetSite',
    method: 'get',
    path: '/Site',
    mock: './assets/mock/GetSite.json',
    responseType: SiteGetResponse
  })
  GetSiteList(
    params: {},
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<SiteGetResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetSiteBySiteID',
    method: 'get',
    path: '/Site/{siteID}',
    mock: './assets/mock/GetSiteBySiteID.json',
    responseType: SiteMapGetResponse
  })
  GetSiteMap(
    params: { siteID: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<SiteMapGetResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetSiteBySiteIDAndNodeID',
    method: 'get',
    path: '/Site/{siteID}/{nodeID}',
    mock: './assets/mock/GetSiteBySiteIDAndNodeID.json',
    responseType: SiteMapNodeGetResponse
  })
  GetSiteNode(
    params: { siteID: string, nodeID: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<SiteMapNodeGetResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetGroupMenuByGroupID',
    method: 'get',
    path: '/Group/Menu/{groupID}',
    mock: './assets/mock/GetGroupMenuByGroupID.json',
    responseType: GroupMenuGetResponse
  })
  GetGroupMenuList(
    params: { groupID: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<GroupMenuGetResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'PutGroupMenuByGroupID',
    method: 'put',
    path: '/Group/Menu/{groupID}',
    mock: './assets/mock/PutGroupMenuByGroupID.json',
    responseType: GenerationHeader
  })
  PutGroupMenuList(
    params: { groupID: string, requestBody: GroupMenuGetResponse },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<GenerationHeader> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetGroupSiteMapBySiteIDAndGroupID',
    method: 'get',
    path: '/Group/SiteMap/{siteID}/{groupID}',
    mock: './assets/mock/GetGroupSiteMapBySiteIDAndGroupID.json',
    responseType: GroupSiteMapGetResponse
  })
  GetGroupSiteMapList(
    params: { groupID: string, siteID: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<GroupSiteMapGetResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'PutGroupSiteMapBySiteIDAndGroupID',
    method: 'put',
    path: '/Group/SiteMap/{siteID}/{groupID}',
    mock: './assets/mock/PutGroupSiteMapBySiteIDAndGroupID.json',
    responseType: GenerationHeader
  })
  PutGroupSiteMapList(
    params: { groupID: string, siteID: string, requestBody: GroupSiteMapGetResponse },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<GenerationHeader> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetTemplateByControlID',
    method: 'get',
    path: '/Template/{controlID}',
    mock: './assets/mock/GetTemplateByControlID.json',
    responseType: TemplateGetResponse
  })
  GetTemplate(
    params: { controlID: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<TemplateGetResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'PutGalleryByGalleryID',
    method: 'put',
    path: '/Gallery/{galleryID}',
    mock: './assets/mock/PutGalleryByGalleryID.json',
    responseType: SaveGalleryResponse
  })
  UpdateGallery(
    params: { galleryID: string, requestBody: any },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<SaveGalleryResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'PostSitemapAuditingByNodeId',
    method: 'post',
    path: '/SitemapAuditing/{nodeId}',
    mock: './assets/mock/PostSitemapAuditingByNodeId.json',
    responseType: GenerationHeader
  })
  AuditingSitemap(
    params: { nodeId: string, requestBody: SitemapAuditingRequest },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<GenerationHeader> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetLayout',
    method: 'get',
    path: '/Layout',
    mock: './assets/mock/GetLayout.json',
    responseType: LayoutGetResponse
  })
  GetLayout(
    params: {},
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<LayoutGetResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetFarmTakeOffByFuncID',
    method: 'get',
    path: '/FarmTakeOff/{funcID}',
    mock: './assets/mock/GetFarmTakeOffByFuncID.json',
    responseType: GenerationHeader
  })
  TakeOffFarmData(
    params: { funcID: string, dataID: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<GenerationHeader> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetSitemapPreviewByNodeID',
    method: 'get',
    path: '/SitemapPreview/{nodeID}',
    mock: './assets/mock/GetSitemapPreviewByNodeID.json',
    responseType: PreviewInfo
  })
  GetSitemapPreview(
    params: { nodeID: string, language_id?: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<PreviewInfo> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetAuditingPreviewByOrderID',
    method: 'get',
    path: '/AuditingPreview/{orderID}',
    mock: './assets/mock/GetAuditingPreviewByOrderID.json',
    responseType: PreviewInfo
  })
  GetAuditingPreview(
    params: { orderID: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<PreviewInfo> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetContentDataSourceByTypeID',
    method: 'get',
    path: '/ContentDataSource/{typeID}',
    mock: './assets/mock/GetContentDataSourceByTypeID.json',
    responseType: ListContentDataSourceResponse
  })
  ListContentDataSource(
    params: { typeID: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<ListContentDataSourceResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetContentVersionByContentID',
    method: 'get',
    path: '/ContentVersion/{contentID}',
    mock: './assets/mock/GetContentVersionByContentID.json',
    responseType: ListContentVersionResponse
  })
  ListContentVersion(
    params: { contentID: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<ListContentVersionResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'PutReOrderSiteMapByNodeID',
    method: 'put',
    path: '/ReOrderSiteMap/{nodeID}',
    mock: './assets/mock/PutReOrderSiteMapByNodeID.json',
    responseType: GenerationHeader
  })
  ReOrderSitemap(
    params: { nodeID: string, node_order: number, parent_id: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<GenerationHeader> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetFarmTriggerByTriggerID',
    method: 'get',
    path: '/FarmTrigger/{triggerID}',
    mock: './assets/mock/GetFarmTriggerByTriggerID.json',
    responseType: ListFarmTriggerDataResponse
  })
  ListFarmTriggerData(
    params: { triggerID: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<ListFarmTriggerDataResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetFarmTreeBySourceID',
    method: 'get',
    path: '/Farm/Tree/{sourceID}',
    mock: './assets/mock/GetFarmTreeBySourceID.json',
    responseType: GetFarmTreeResponse
  })
  GetFarmTree(
    params: { sourceID: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<GetFarmTreeResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetGroup',
    method: 'get',
    path: '/Group',
    mock: './assets/mock/GetGroup.json',
    responseType: ListGroupResponst
  })
  GetGroupList(
    params: {},
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<ListGroupResponst> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetGalleryConfig',
    method: 'get',
    path: '/GalleryConfig',
    mock: './assets/mock/GetGalleryConfig.json',
    responseType: GalleryConfigResponse
  })
  GetGalleryConfig(
    params: {},
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<GalleryConfigResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetSitemapContentUnlockBySiteIdAndNodeId',
    method: 'get',
    path: '/SitemapContentUnlock/{siteId}/{nodeId}',
    mock: './assets/mock/GetSitemapContentUnlockBySiteIdAndNodeId.json',
    responseType: GenerationHeader
  })
  SitemapContentUnlock(
    params: { siteId: string, nodeId: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<GenerationHeader> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'PostGallery',
    method: 'post',
    path: '/Gallery',
    mock: './assets/mock/PostGallery.json',
    responseType: SaveGalleryResponse
  })
  AddGallery(
    params: {},
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<SaveGalleryResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetGalleryShowOriginalByGalleryID',
    method: 'get',
    path: '/Gallery/ShowOriginal/{galleryID}',
    mock: './assets/mock/GetGalleryShowOriginalByGalleryID.json',
    responseType: null
  })
  GetGalleryShowOriginal(
    params: { galleryID: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<any> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetSliderTypeRangeByTypeId',
    method: 'get',
    path: '/SliderType/Range/{typeId}',
    mock: './assets/mock/GetSliderTypeRangeByTypeId.json',
    responseType: GetSliderTypeRangeResponse
  })
  GetSliderTypeRange(
    params: { typeId: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<GetSliderTypeRangeResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetGallerySettingByGalleryID',
    method: 'get',
    path: '/GallerySetting/{galleryID}',
    mock: './assets/mock/GetGallerySettingByGalleryID.json',
    responseType: GetGallerySettingResponse
  })
  GetGallerySetting(
    params: { galleryID: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<GetGallerySettingResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'PostFile',
    method: 'post',
    path: '/File',
    mock: './assets/mock/PostFile.json',
    responseType: SaveFileResponse
  })
  AddFile(
    params: {},
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<SaveFileResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'PutFileByGalleryID',
    method: 'put',
    path: '/File/{galleryID}',
    mock: './assets/mock/PutFileByGalleryID.json',
    responseType: SaveFileResponse
  })
  UpdateFile(
    params: { galleryID: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<SaveFileResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetFormType',
    method: 'get',
    path: '/FormType',
    mock: './assets/mock/GetFormType.json',
    responseType: ListFormTypeResponse
  })
  ListFormType(
    params: {},
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<ListFormTypeResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetFormTypeByTypeID',
    method: 'get',
    path: '/FormType/{typeID}',
    mock: './assets/mock/GetFormTypeByTypeID.json',
    responseType: ListFilesResponse
  })
  ListFiles(
    params: { typeID: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<ListFilesResponse> { return null; }

  private getUrlByPathAndParams(path: string, params: { [key: string]: any }) {
    let url = path;
    for (const key in params) {
      url = url.replace(new RegExp(`{${key}}`, 'g'), params[key]);
    }
    return `${this.apiBaseUrl}/${url}`;
  }

  private creatApiRequest(method: string, url: string, params: { [key: string]: any }, ) {
    const requestBodyPropertyName = 'requestBody';

    let httpParams = new HttpParams();
    for (const key in params) {
      if (key === requestBodyPropertyName) { continue; }
      httpParams = httpParams.set(key, params[key] || '');
    }

    return {
      type: method.toUpperCase(),
      url,
      body: params[requestBodyPropertyName],
      params: httpParams,
    };
  }

  private dispatch(
    apiName: string, method: string, path: string, mockPath: string, params: { [key: string]: any }, responseType: any,
    apiDispatchOptions,
  ) {
    const url = this.getUrlByPathAndParams(path, params);
    const apiRequest = this.creatApiRequest(method, url, params);

    const restAPI = {
      ...params, url,
      getApiName() { return apiName; },
      getMockPath() { return mockPath; },
      getRequestData() { return apiRequest; }
    };
    console.log(`RestApiService.dispatch()`, { restAPI });
    
    return this.dispatcher.dispatch(restAPI, apiDispatchOptions).pipe(
      map((x: any) => {
        x._body = responseType ? plainToClass(responseType, x.body) : responseType;
        return x;
      }),
      switchMap(x => from(this.validateBodyClass(x))),
      map((x: any) => x._body), // 因應res結構調整
    );
  }

  public dispatchRestApi<T>(name: string, params: any, apiDispatchOptions?: ApiDispatchOptions): Observable<T> {
    const restAPI = this.apiFactory.getApi(name);
    this.setAPIParams(restAPI, params);
    this.setUrl(restAPI, params);
    return throwError('dispatchRestApi() 方法已棄用');
    // return this.dispatcher.dispatch(restAPI, apiDispatchOptions).pipe(
    //   map((x: any) => {
    //       x._body = plainToClass(APIResponseMap[name], x.body);
    //       return x;
    //   }),
    //   switchMap(x => from(this.validateBodyClass(x))),
    //   map((x: any) => x._body), // 因應res結構調整
    // );
  }

  private setAPIParams(api: any, params: any) {
    for (let key in params) {
        api[key] = params[key];
    }
  }

  private setUrl(api: any, params: any) {
    let _url = this.apiConfig.API_URL[api.getApiName()];
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