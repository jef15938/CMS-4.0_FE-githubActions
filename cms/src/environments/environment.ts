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
    GetAuditing: `${BASE_URL}\/Auditing`,
    GetAuditingByOrderID: `${BASE_URL}\/Auditing/{orderID}`,
    PostAuditingByOrderID: `${BASE_URL}\/Auditing/{orderID}`,
    GetLoginInfo: `${BASE_URL}\/LoginInfo`,
    GetCMSSiteMapBySiteID: `${BASE_URL}\/CMSSiteMap/{siteID}`,
    GetCMSMenu: `${BASE_URL}\/CMSMenu`,
    GetUserSiteMapBySiteID: `${BASE_URL}\/UserSiteMap/{siteID}`,
    PostUserSiteMapBySiteID: `${BASE_URL}\/UserSiteMap/{siteID}`,
    PutUserSiteMapByNodeID: `${BASE_URL}\/UserSiteMap/{nodeID}`,
    DeleteUserSiteMapByNodeID: `${BASE_URL}\/UserSiteMap/{nodeID}`,
  },
  API_TYPE: {
    GetGalleryByCategoryID: 'Restful',
    GetGalleryCategory: 'Restful',
    PostGalleryCategory: 'Restful',
    PostLogin: 'Restful',
    GetDepartment: 'Mock',
    DeleteGalleryCategoryByCategoryID: 'Restful',
    PutGalleryCategoryByCategoryID: 'Restful',
    GetUserMenu: 'Mock',
    GetLogout: 'Restful',
    PutDepartmentByDeptID: 'Restful',
    DeleteDepartmentByDeptID: 'Restful',
    PostDepartmentByDeptID: 'Restful',
    GetAuditing: 'Restful',
    GetAuditingByOrderID: 'Restful',
    PostAuditingByOrderID: 'Restful',
    GetLoginInfo: 'Restful',
    GetCMSSiteMapBySiteID: 'Restful',
    GetCMSMenu: 'Restful',
    GetUserSiteMapBySiteID: 'Restful',
    PostUserSiteMapBySiteID: 'Restful',
    PutUserSiteMapByNodeID: 'Restful',
    DeleteUserSiteMapByNodeID: 'Restful',
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
