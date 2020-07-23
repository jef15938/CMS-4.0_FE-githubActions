
const BASE_URL = 'http://runtime.decoder.com.tw';
const API_URL = {
  GetPageByPageID: `${BASE_URL}\/Page/{pageID}`,
  GetSiteMap: `${BASE_URL}\/SiteMap`,
  GetPreviewPageByPageID: `${BASE_URL}\/Preview/Page/{pageID}`,
  GetPreviewSiteMap: `${BASE_URL}\/Preview/SiteMap`,
  GetPreviewCompareByPageID: `${BASE_URL}\/Preview/Compare/{pageID}`,
  GetSiteMapDownloadByFormat: `${BASE_URL}\/SiteMap/Download/{format}`,

};
const API_TYPE = {
  GetPageByPageID: 'Restful',
  GetSiteMap: 'Restful',
  GetPreviewPageByPageID: 'Restful',
  GetPreviewSiteMap: 'Restful',
  GetPreviewCompareByPageID: 'Restful',
  GetSiteMapDownloadByFormat: 'Restful',

};
