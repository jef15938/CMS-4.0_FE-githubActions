
const BASE_URL = 'http://runtime.decoder.com.tw';
const API_URL = {
    GetPageByPageIDAndLang: `${BASE_URL}\/Page/{pageID}/{lang}`,
GetPageByPageID: `${BASE_URL}\/Page/{pageID}`,
GetSiteMap: `${BASE_URL}\/SiteMap`,
GetPreviewPageByPageIDAndLang: `${BASE_URL}\/Preview/Page/{pageID}/{lang}`,
GetPreviewPageByPageID: `${BASE_URL}\/Preview/Page/{pageID}`,
GetPreviewSiteMap: `${BASE_URL}\/Preview/SiteMap`,
GetPreviewCompareByPageID: `${BASE_URL}\/Preview/Compare/{pageID}`,
GetSiteMapDownloadByFormat: `${BASE_URL}\/SiteMap/Download/{format}`,
GetContentByContentID: `${BASE_URL}\/Content/{contentID}`,
GetPreviewContentByContentID: `${BASE_URL}\/Preview/Content/{contentID}`,
GetDataSourceByTypeIDAndId: `${BASE_URL}\/DataSource/{typeID}/{id}`,

};
const API_TYPE = {
    GetPageByPageIDAndLang: 'Restful',
GetPageByPageID: 'Restful',
GetSiteMap: 'Restful',
GetPreviewPageByPageIDAndLang: 'Restful',
GetPreviewPageByPageID: 'Restful',
GetPreviewSiteMap: 'Restful',
GetPreviewCompareByPageID: 'Restful',
GetSiteMapDownloadByFormat: 'Restful',
GetContentByContentID: 'Restful',
GetPreviewContentByContentID: 'Restful',
GetDataSourceByTypeIDAndId: 'Restful',

};