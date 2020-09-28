
const BASE_URL = 'http://runtime.decoder.com.tw';
const API_URL = {
    GetPageByPageIdAndLang: `${BASE_URL}\/Page/{page_id}/{lang}`,
GetPageByPageId: `${BASE_URL}\/Page/{page_id}`,
GetSiteMap: `${BASE_URL}\/SiteMap`,
GetPreviewPageByPageIdAndLang: `${BASE_URL}\/Preview/Page/{page_id}/{lang}`,
GetPreviewPageByPageId: `${BASE_URL}\/Preview/Page/{page_id}`,
GetPreviewSiteMap: `${BASE_URL}\/Preview/SiteMap`,
GetPreviewCompareByPageId: `${BASE_URL}\/Preview/Compare/{page_id}`,
GetSiteMapDownloadByFormat: `${BASE_URL}\/SiteMap/Download/{format}`,
GetContentByContentId: `${BASE_URL}\/Content/{content_id}`,
GetPreviewContentByContentId: `${BASE_URL}\/Preview/Content/{content_id}`,
GetDataSourceByTypeIdAndId: `${BASE_URL}\/DataSource/{type_id}/{id}`,

};
const API_TYPE = {
    GetPageByPageIdAndLang: 'Restful',
GetPageByPageId: 'Restful',
GetSiteMap: 'Restful',
GetPreviewPageByPageIdAndLang: 'Restful',
GetPreviewPageByPageId: 'Restful',
GetPreviewSiteMap: 'Restful',
GetPreviewCompareByPageId: 'Restful',
GetSiteMapDownloadByFormat: 'Restful',
GetContentByContentId: 'Restful',
GetPreviewContentByContentId: 'Restful',
GetDataSourceByTypeIdAndId: 'Restful',

};