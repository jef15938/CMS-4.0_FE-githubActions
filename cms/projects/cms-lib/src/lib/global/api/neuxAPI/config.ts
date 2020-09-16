
const BASE_URL = 'https://cms.decoder.com.tw';
const API_URL = {
    GetGalleryByCategoryID: `${BASE_URL}\/Gallery/{categoryID}`,
PostGalleryByCategoryID: `${BASE_URL}\/Gallery/{categoryID}`,
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
GetCMSMenu: `${BASE_URL}\/CMSMenu`,
GetUserSiteMapBySiteID: `${BASE_URL}\/UserSiteMap/{siteID}`,
PostUserSiteMapBySiteID: `${BASE_URL}\/UserSiteMap/{siteID}`,
PutUserSiteMapByNodeID: `${BASE_URL}\/UserSiteMap/{nodeID}`,
DeleteUserSiteMapByNodeID: `${BASE_URL}\/UserSiteMap/{nodeID}`,
GetContentById: `${BASE_URL}\/Content/{id}`,
PutContentById: `${BASE_URL}\/Content/{id}`,
GetSitemapContentBySiteIdAndNodeId: `${BASE_URL}\/SitemapContent/{siteId}/{nodeId}`,
GetMyAuditingByOrderID: `${BASE_URL}\/MyAuditing/{orderID}`,
GetMyAuditing: `${BASE_URL}\/MyAuditing`,
GetFarmByFuncID: `${BASE_URL}\/Farm/{funcID}`,
GetFarmTableInfoByFuncID: `${BASE_URL}\/FarmTableInfo/{funcID}`,
GetFarmFormInfoByFuncID: `${BASE_URL}\/FarmFormInfo/{funcID}`,
PostFarmFormInfoByFuncID: `${BASE_URL}\/FarmFormInfo/{funcID}`,
PutFarmFormInfoByFuncID: `${BASE_URL}\/FarmFormInfo/{funcID}`,
PostFarmAuditingByFuncId: `${BASE_URL}\/FarmAuditing/{funcId}`,
GetFarmDetailInfoByFuncID: `${BASE_URL}\/FarmDetailInfo/{funcID}`,
GetFarmPreviewByFuncID: `${BASE_URL}\/FarmPreview/{funcID}`,
GetGalleryShowByGalleryID: `${BASE_URL}\/Gallery/Show/{galleryID}`,
GetSite: `${BASE_URL}\/Site`,
GetSiteBySiteID: `${BASE_URL}\/Site/{siteID}`,
GetSiteBySiteIDAndNodeID: `${BASE_URL}\/Site/{siteID}/{nodeID}`,
GetGroupMenuByGroupID: `${BASE_URL}\/Group/Menu/{groupID}`,
PutGroupMenuByGroupID: `${BASE_URL}\/Group/Menu/{groupID}`,
GetGroupSiteMapBySiteIDAndGroupID: `${BASE_URL}\/Group/SiteMap/{siteID}/{groupID}`,
PutGroupSiteMapBySiteIDAndGroupID: `${BASE_URL}\/Group/SiteMap/{siteID}/{groupID}`,
GetTemplateByControlID: `${BASE_URL}\/Template/{controlID}`,
PutGalleryByGalleryID: `${BASE_URL}\/Gallery/{galleryID}`,
PostSitemapAuditingByNodeId: `${BASE_URL}\/SitemapAuditing/{nodeId}`,
GetLayout: `${BASE_URL}\/Layout`,
GetFarmTakeOffByFuncID: `${BASE_URL}\/FarmTakeOff/{funcID}`,
GetSitemapPreviewByNodeID: `${BASE_URL}\/SitemapPreview/{nodeID}`,
GetAuditingPreviewByOrderID: `${BASE_URL}\/AuditingPreview/{orderID}`,
GetContentDataSourceByTypeID: `${BASE_URL}\/ContentDataSource/{typeID}`,
GetContentVersionByContentID: `${BASE_URL}\/ContentVersion/{contentID}`,
PutReOrderSiteMapByNodeID: `${BASE_URL}\/ReOrderSiteMap/{nodeID}`,
GetFarmTriggerByTriggerID: `${BASE_URL}\/FarmTrigger/{triggerID}`,
GetFarmTreeBySourceID: `${BASE_URL}\/Farm/Tree/{sourceID}`,
GetGroup: `${BASE_URL}\/Group`,
GetGalleryConfig: `${BASE_URL}\/GalleryConfig`,
GetSitemapContentUnlockBySiteIdAndNodeId: `${BASE_URL}\/SitemapContentUnlock/{siteId}/{nodeId}`,
PostGallery: `${BASE_URL}\/Gallery`,
GetGalleryShowOriginalByGalleryID: `${BASE_URL}\/Gallery/ShowOriginal/{galleryID}`,
GetSliderTypeRange: `${BASE_URL}\/SliderType/Range`,
GetGallerySettingByGalleryID: `${BASE_URL}\/GallerySetting/{galleryID}`,
PostFile: `${BASE_URL}\/File`,
PutFileByGalleryID: `${BASE_URL}\/File/{galleryID}`,
GetFormType: `${BASE_URL}\/FormType`,
GetFormTypeByTypeID: `${BASE_URL}\/FormType/{typeID}`,

};
const API_TYPE = {
    GetGalleryByCategoryID: 'Restful',
PostGalleryByCategoryID: 'Restful',
GetGalleryCategory: 'Restful',
PostGalleryCategory: 'Restful',
PostLogin: 'Restful',
GetDepartment: 'Restful',
DeleteGalleryCategoryByCategoryID: 'Restful',
PutGalleryCategoryByCategoryID: 'Restful',
GetUserMenu: 'Restful',
GetLogout: 'Restful',
PutDepartmentByDeptID: 'Restful',
DeleteDepartmentByDeptID: 'Restful',
PostDepartmentByDeptID: 'Restful',
GetDepartmentByDeptID: 'Restful',
GetAuditing: 'Restful',
PostAuditingByOrderID: 'Restful',
GetLoginInfo: 'Restful',
GetCMSMenu: 'Restful',
GetUserSiteMapBySiteID: 'Restful',
PostUserSiteMapBySiteID: 'Restful',
PutUserSiteMapByNodeID: 'Restful',
DeleteUserSiteMapByNodeID: 'Restful',
GetContentById: 'Restful',
PutContentById: 'Restful',
GetSitemapContentBySiteIdAndNodeId: 'Restful',
GetMyAuditingByOrderID: 'Restful',
GetMyAuditing: 'Restful',
GetFarmByFuncID: 'Restful',
GetFarmTableInfoByFuncID: 'Restful',
GetFarmFormInfoByFuncID: 'Restful',
PostFarmFormInfoByFuncID: 'Restful',
PutFarmFormInfoByFuncID: 'Restful',
PostFarmAuditingByFuncId: 'Restful',
GetFarmDetailInfoByFuncID: 'Restful',
GetFarmPreviewByFuncID: 'Restful',
GetGalleryShowByGalleryID: 'Restful',
GetSite: 'Restful',
GetSiteBySiteID: 'Restful',
GetSiteBySiteIDAndNodeID: 'Restful',
GetGroupMenuByGroupID: 'Restful',
PutGroupMenuByGroupID: 'Restful',
GetGroupSiteMapBySiteIDAndGroupID: 'Restful',
PutGroupSiteMapBySiteIDAndGroupID: 'Restful',
GetTemplateByControlID: 'Restful',
PutGalleryByGalleryID: 'Restful',
PostSitemapAuditingByNodeId: 'Restful',
GetLayout: 'Restful',
GetFarmTakeOffByFuncID: 'Restful',
GetSitemapPreviewByNodeID: 'Restful',
GetAuditingPreviewByOrderID: 'Restful',
GetContentDataSourceByTypeID: 'Restful',
GetContentVersionByContentID: 'Restful',
PutReOrderSiteMapByNodeID: 'Restful',
GetFarmTriggerByTriggerID: 'Restful',
GetFarmTreeBySourceID: 'Restful',
GetGroup: 'Restful',
GetGalleryConfig: 'Restful',
GetSitemapContentUnlockBySiteIdAndNodeId: 'Restful',
PostGallery: 'Restful',
GetGalleryShowOriginalByGalleryID: 'Restful',
GetSliderTypeRange: 'Restful',
GetGallerySettingByGalleryID: 'Restful',
PostFile: 'Restful',
PutFileByGalleryID: 'Restful',
GetFormType: 'Restful',
GetFormTypeByTypeID: 'Restful',

};