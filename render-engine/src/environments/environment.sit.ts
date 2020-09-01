
const BASE_URL = 'http://runtime.decoder.com.tw';
const RESOUCE_BASE_URL = 'https://cms.decoder.com.tw';
const API_URL = {
  GetPageByPageIDAndLang: `${BASE_URL}\/Page/{pageID}/{lang}`,
  GetPageByPageID: `${BASE_URL}\/Page/{pageID}`,
  GetSiteMapByNodeIdAndLang: `${BASE_URL}\/SiteMap/{node_id}/{lang}`,
  GetSiteMapByNodeId: `${BASE_URL}\/SiteMap/{node_id}`,
  GetPreviewPageByPageIDAndLang: `${BASE_URL}\/Preview/Page/{pageID}/{lang}`,
  GetPreviewPageByPageID: `${BASE_URL}\/Preview/Page/{pageID}`,
  GetPreviewSiteMapByNodeIdAndLang: `${BASE_URL}\/Preview/SiteMap/{node_id}/{lang}`,
  GetPreviewSiteMapByNodeId: `${BASE_URL}\/Preview/SiteMap/{node_id}/`,
  GetPreviewCompareByPageID: `${BASE_URL}\/Preview/Compare/{pageID}`,
  GetSiteMapDownloadByFormat: `${BASE_URL}\/SiteMap/Download/{format}`,
  GetContentByContentID: `${BASE_URL}\/Content/{contentID}`,
  GetPreviewContentByContentID: `${BASE_URL}\/Preview/Content/{contentID}`,
  GetDataSourceByTypeIDAndId: `${BASE_URL}\/DataSource/{typeID}/{id}`,

};
const API_TYPE = {
  GetPageByPageIDAndLang: 'Restful',
  GetPageByPageID: 'Restful',
  GetSiteMapByNodeIdAndLang: 'Restful',
  GetSiteMapByNodeId: 'Restful',
  GetPreviewPageByPageIDAndLang: 'Restful',
  GetPreviewPageByPageID: 'Restful',
  GetPreviewSiteMapByNodeIdAndLang: 'Restful',
  GetPreviewSiteMapByNodeId: 'Restful',
  GetPreviewCompareByPageID: 'Restful',
  GetSiteMapDownloadByFormat: 'Restful',
  GetContentByContentID: 'Restful',
  GetPreviewContentByContentID: 'Restful',
  GetDataSourceByTypeIDAndId: 'Restful',

};

export const environment = {
  production: true,
  apiBaseUrl: BASE_URL,
  resourceBaseUrl: RESOUCE_BASE_URL,
  API_URL,
  API_TYPE,
  google: {
    GA_TRACKING_ID: 'UA-175666152-1',
  },
};
