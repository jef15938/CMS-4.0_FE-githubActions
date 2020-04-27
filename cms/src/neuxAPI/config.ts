
const BASE_URL = 'http://cms.decoder.com.tw';
const API_URL = {
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

};
const API_TYPE = {
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

};