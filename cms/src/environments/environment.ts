// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const BASE_URL = 'http://localhost:4010';
export const environment = {
  production: false,
  API_URL: {
    GetGalleryByCategoryID: `${BASE_URL}\/Gallery/{categoryID}`,
    GetGalleryCategory: `${BASE_URL}\/GalleryCategory`,
    PostGalleryCategory: `${BASE_URL}\/GalleryCategory`,
    PostLogin: `${BASE_URL}\/Login`,
    GetDepartment: `${BASE_URL}\/Department`,
    DeleteGalleryCategoryByCategoryID: `${BASE_URL}\/GalleryCategory/{categoryID}`,
    PutGalleryCategoryByCategoryID: `${BASE_URL}\/GalleryCategory/{categoryID}`,
    GetUserMenu: `${BASE_URL}\/UserMenu`,
    GetLogout: `${BASE_URL}\/Logout`,
    PutDepartmentByDeptID: `${BASE_URL}\/Department/{deptID}`,
    DeleteDepartmentByDeptID: `${BASE_URL}\/Department/{deptID}`,
    PostDepartmentByDeptID: `${BASE_URL}\/Department/{deptID}`,
    GetDepartmentByDeptID: `${BASE_URL}\/Department/{deptID}`,
    GetAuditing: `${BASE_URL}\/Auditing`,
    PostAuditingByOrderID: `${BASE_URL}\/Auditing/{orderID}`,
    GetLoginInfo: `${BASE_URL}\/LoginInfo`,
    GetCMSSiteMapBySiteID: `${BASE_URL}\/CMSSiteMap/{siteID}`,
    GetCMSMenu: `${BASE_URL}\/CMSMenu`,
    GetUserSiteMapBySiteID: `${BASE_URL}\/UserSiteMap/{siteID}`,
    PostUserSiteMapBySiteID: `${BASE_URL}\/UserSiteMap/{siteID}`,
    PutUserSiteMapByNodeID: `${BASE_URL}\/UserSiteMap/{nodeID}`,
    DeleteUserSiteMapByNodeID: `${BASE_URL}\/UserSiteMap/{nodeID}`,
    GetContentByContentID: `${BASE_URL}\/Content/{contentID}`,
    PutContentByContentID: `${BASE_URL}\/Content/{contentID}`,
    GetMyAuditingByOrderID: `${BASE_URL}\/MyAuditing/{orderID}`,
    GetMyAuditing: `${BASE_URL}\/MyAuditing`,
    GetFarmByFuncID: `${BASE_URL}\/Farm/{funcID}`,
    GetFarmTableInfoByFuncID: `${BASE_URL}\/FarmTableInfo/{funcID}`,
    GetFarmFormInfoByFuncID: `${BASE_URL}\/FarmFormInfo/{funcID}`,
    PostFarmFormInfoByFuncID: `${BASE_URL}\/FarmFormInfo/{funcID}`,
    PutFarmFormInfoByFuncID: `${BASE_URL}\/FarmFormInfo/{funcID}`,
    GetFarmDetailInfoByFarmID: `${BASE_URL}\/FarmDetailInfo/{farmID}`,
    GetSite: `${BASE_URL}\/Site`,
    GetGroupMenuByGroupID: `${BASE_URL}\/Group/Menu/{groupID}`,
    GetGroupSiteMapByGroupID: `${BASE_URL}\/Group/SiteMap/{groupID}`,
    GetTemplateByControlID: `${BASE_URL}\/Template/{controlID}`,
  },
  API_TYPE: {
    GetGalleryByCategoryID: 'Mock',
    GetGalleryCategory: 'Mock',
    PostGalleryCategory: 'Restful',
    PostLogin: 'Restful',
    GetDepartment: 'Mock',
    DeleteGalleryCategoryByCategoryID: 'Restful',
    PutGalleryCategoryByCategoryID: 'Restful',
    GetUserMenu: 'Mock',
    GetLogout: 'Restful',
    PutDepartmentByDeptID: 'Mock',
    DeleteDepartmentByDeptID: 'Restful',
    PostDepartmentByDeptID: 'Mock',
    GetDepartmentByDeptID: 'Restful',
    GetAuditing: 'Mock',
    PostAuditingByOrderID: 'Restful',
    GetLoginInfo: 'Restful',
    GetCMSSiteMapBySiteID: 'Restful',
    GetCMSMenu: 'Restful',
    GetUserSiteMapBySiteID: 'Mock',
    PostUserSiteMapBySiteID: 'Restful',
    PutUserSiteMapByNodeID: 'Restful',
    DeleteUserSiteMapByNodeID: 'Restful',
    GetContentByContentID: 'Mock',
    PutContentByContentID: 'Restful',
    GetMyAuditingByOrderID: 'Mock',
    GetMyAuditing: 'Mock',
    GetFarmByFuncID: 'Restful',
    GetFarmTableInfoByFuncID: 'Restful',
    GetFarmFormInfoByFuncID: 'Restful',
    PostFarmFormInfoByFuncID: 'Restful',
    PutFarmFormInfoByFuncID: 'Restful',
    GetFarmDetailInfoByFarmID: 'Restful',
    GetSite: 'Mock',
    GetGroupMenuByGroupID: 'Restful',
    GetGroupSiteMapByGroupID: 'Restful',
    GetTemplateByControlID: 'Mock',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
