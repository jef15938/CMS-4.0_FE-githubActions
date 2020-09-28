// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


const BASE_URL = 'https://sit.walkflow.biz/api';
const RESOUCE_BASE_URL = '';
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
