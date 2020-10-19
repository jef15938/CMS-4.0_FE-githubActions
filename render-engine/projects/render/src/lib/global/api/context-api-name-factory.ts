export type ApiContext = 'preview' | 'runtime' | 'batchSSR';

export class ContextApiNameFactory {

  static GetPageByPageID(context: ApiContext) {
    const apiPreview = 'GetPreviewPageByPageID';
    const apiRuntime = 'GetPageByPageID';
    switch (context) {
      case 'batchSSR':
        return apiPreview;
      case 'preview':
        return apiPreview;
      case 'runtime':
        return apiRuntime;
    }
  }

  static GetPageByPageIDAndLang(context: ApiContext) {
    const apiPreview = 'GetPreviewPageByPageIDAndLang';
    const apiRuntime = 'GetPageByPageIDAndLang';
    switch (context) {
      case 'batchSSR':
        return apiPreview;
      case 'preview':
        return apiPreview;
      case 'runtime':
        return apiRuntime;
    }
  }

  static GetContentByContentID(context: ApiContext) {
    const apiPreview = 'GetPreviewContentByContentID';
    const apiRuntime = 'GetContentByContentID';
    switch (context) {
      case 'batchSSR':
        return apiPreview;
      case 'preview':
        return apiPreview;
      case 'runtime':
        return apiRuntime;
    }
  }

  static GetSiteMapByNodeId(context: ApiContext) {
    const apiPreview = 'GetPreviewSiteMapByNodeId';
    const apiRuntime = 'GetSiteMapByNodeId';
    switch (context) {
      case 'batchSSR':
        return apiPreview;
      case 'preview':
        return apiPreview;
      case 'runtime':
        return apiRuntime;
    }
  }

  // static GetSiteMapByNodeIdAndLang(context: ApiContext) {
  //   const apiPreview = 'GetPreviewSiteMapByNodeIdAndLang';
  //   const apiRuntime = 'GetSiteMapByNodeIdAndLang';
  //   switch (context) {
  //     case 'batchSSR':
  //       return apiRuntime;
  //     case 'preview':
  //       return apiPreview;
  //     case 'runtime':
  //       return '';
  //   }
  // }
}
