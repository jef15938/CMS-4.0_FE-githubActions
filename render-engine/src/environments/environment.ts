// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

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

export const environment = {
  production: false,
  apiBaseUrl: BASE_URL,
  API_URL,
  API_TYPE
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
