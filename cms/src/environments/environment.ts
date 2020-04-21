// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const BASE_URL = 'http://localhost:4010';
export const environment = {
  production: false,
  API_URL: {
    GetGalleryByCategoryID: `${BASE_URL}\/Gallery/{categoryID}`,
    GetGalleryCategory: `${BASE_URL}\/GalleryCategory`,
    PostLogin: `${BASE_URL}\/Login`,
    GetDepartment: `${BASE_URL}\/Department`,
    DeleteGalleryCategoryByCategoryID: `${BASE_URL}\/GalleryCategory/{categoryID}`,
    PutGalleryCategoryByCategoryID: `${BASE_URL}\/GalleryCategory/{categoryID}`,
    PostGalleryCategoryByCategoryID: `${BASE_URL}\/GalleryCategory/{categoryID}`,
    GetMenuByUserID: `${BASE_URL}\/Menu/{userID}`,
    GetLogout: `${BASE_URL}\/Logout`,
    PutDepartmentByDeptID: `${BASE_URL}\/Department/{deptID}`,
    DeleteDepartmentByDeptID: `${BASE_URL}\/Department/{deptID}`,
    PostDepartmentByDeptID: `${BASE_URL}\/Department/{deptID}`,
    GetAuditing: `${BASE_URL}\/Auditing`,
    GetAuditingByOrderID: `${BASE_URL}\/Auditing/{orderID}`,
    PostAuditingByOrderID: `${BASE_URL}\/Auditing/{orderID}`,
  },
  API_TYPE: {
    GetGalleryByCategoryID: 'Restful',
    GetGalleryCategory: 'Restful',
    PostLogin: 'Restful',
    GetDepartment: 'Restful',
    DeleteGalleryCategoryByCategoryID: 'Restful',
    PutGalleryCategoryByCategoryID: 'Restful',
    PostGalleryCategoryByCategoryID: 'Restful',
    GetMenuByUserID: 'Restful',
    GetLogout: 'Restful',
    PutDepartmentByDeptID: 'Restful',
    DeleteDepartmentByDeptID: 'Restful',
    PostDepartmentByDeptID: 'Restful',
    GetAuditing: 'Restful',
    GetAuditingByOrderID: 'Restful',
    PostAuditingByOrderID: 'Restful',
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
