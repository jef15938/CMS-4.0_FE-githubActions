// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


const BASE_URL = 'http://runtime.decoder.com.tw';
const RESOUCE_BASE_URL = 'https://cms.decoder.com.tw';
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

export const environment = {
  production: false,
  apiBaseUrl: BASE_URL,
  resourceBaseUrl: RESOUCE_BASE_URL,
  API_URL,
  API_TYPE,
  google: {
    GA_TRACKING_ID: 'UA-175666152-1',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
