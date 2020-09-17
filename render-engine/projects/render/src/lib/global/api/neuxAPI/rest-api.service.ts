import { Injectable, Inject } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ApiFactory, ApiDispatch, ConfigGetter, ApiConfig, ApiDispatchOptions } from '@neux/core';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { PageInfoGetResponse } from './bean/PageInfoGetResponse';
import { SiteMapGetResponse } from './bean/SiteMapGetResponse';
import { ContentInfo } from './bean/ContentInfo';
import { ListDataSourceDataResponse } from './bean/ListDataSourceDataResponse';



export function RestApi(config: {
  apiName: string, method: string, path: string, mock: string, responseType: any,
}) {
  const func = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    descriptor.value = function(params: { [key: string]: any }, apiDispatchOptions?: ApiDispatchOptions) {
      console.log(`RestApi ${propertyKey}()`, config, { params, apiDispatchOptions });
      return (this as any).dispatch(
        config.apiName, config.method, config.path, config.mock, params, config.responseType, apiDispatchOptions
      );
    };
  };
  return func;
}

@Injectable({
    providedIn: 'root'
})
export class RestApiService {

  private apiConfig: ApiConfig;

  constructor(
    private apiFactory: ApiFactory,
    private dispatcher: ApiDispatch,
    private configGetter: ConfigGetter,
    @Inject('API_BASE_URL') private apiBaseUrl: string,
  ) {
    this.apiConfig = this.configGetter.getApiConfig();
  }

  // @dynamic
  @RestApi({
    apiName: 'GetPageByPageIDAndLang',
    method: 'get',
    path: '/Page/{pageID}/{lang}',
    mock: './assets/mock/GetPageByPageIDAndLang.json',
    responseType: PageInfoGetResponse
  })
  GetPageInfoByLang(
    params: { pageID: string, lang: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<PageInfoGetResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetPageByPageID',
    method: 'get',
    path: '/Page/{pageID}',
    mock: './assets/mock/GetPageByPageID.json',
    responseType: PageInfoGetResponse
  })
  GetPageInfo(
    params: { pageID: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<PageInfoGetResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetSiteMap',
    method: 'get',
    path: '/SiteMap',
    mock: './assets/mock/GetSiteMap.json',
    responseType: SiteMapGetResponse
  })
  GetSiteMap(
    params: {},
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<SiteMapGetResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetPreviewPageByPageIDAndLang',
    method: 'get',
    path: '/Preview/Page/{pageID}/{lang}',
    mock: './assets/mock/GetPreviewPageByPageIDAndLang.json',
    responseType: PageInfoGetResponse
  })
  GetPreviewPageInfoByLang(
    params: { pageID: string, lang: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<PageInfoGetResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetPreviewPageByPageID',
    method: 'get',
    path: '/Preview/Page/{pageID}',
    mock: './assets/mock/GetPreviewPageByPageID.json',
    responseType: PageInfoGetResponse
  })
  GetPreviewPageInfo(
    params: { pageID: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<PageInfoGetResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetPreviewSiteMap',
    method: 'get',
    path: '/Preview/SiteMap',
    mock: './assets/mock/GetPreviewSiteMap.json',
    responseType: SiteMapGetResponse
  })
  GetPreviewSiteMap(
    params: {},
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<SiteMapGetResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetPreviewCompareByPageID',
    method: 'get',
    path: '/Preview/Compare/{pageID}',
    mock: './assets/mock/GetPreviewCompareByPageID.json',
    responseType: null
  })
  GetPreviewCompareInfo(
    params: { pageID: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<any> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetSiteMapDownloadByFormat',
    method: 'get',
    path: '/SiteMap/Download/{format}',
    mock: './assets/mock/GetSiteMapDownloadByFormat.json',
    responseType: null
  })
  DownloadSiteMap(
    params: { format: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<any> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetContentByContentID',
    method: 'get',
    path: '/Content/{contentID}',
    mock: './assets/mock/GetContentByContentID.json',
    responseType: ContentInfo
  })
  GetContentInfo(
    params: { contentID: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<ContentInfo> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetPreviewContentByContentID',
    method: 'get',
    path: '/Preview/Content/{contentID}',
    mock: './assets/mock/GetPreviewContentByContentID.json',
    responseType: ContentInfo
  })
  GetPreviewContent(
    params: { contentID: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<ContentInfo> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetDataSourceByTypeIDAndId',
    method: 'get',
    path: '/DataSource/{typeID}/{id}',
    mock: './assets/mock/GetDataSourceByTypeIDAndId.json',
    responseType: ListDataSourceDataResponse
  })
  ListDataSourceData(
    params: { typeID: string, id: string, page?: number, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<ListDataSourceDataResponse> { return null; }

  private getUrlByPathAndParams(path: string, params: { [key: string]: any }) {
    let url = path;
    for (const key in params) {
      url = url.replace(new RegExp(`{${key}}`, 'g'), params[key]);
    }
    return `${this.apiBaseUrl}/${url}`;
  }

  private creatApiRequest(method: string, url: string, params: { [key: string]: any }, ) {
    const requestBodyPropertyName = 'requestBody';

    let httpParams = new HttpParams();
    for (const key in params) {
      if (key === requestBodyPropertyName) { continue; }
      httpParams = httpParams.set(key, params[key] || '');
    }

    return {
      type: method.toUpperCase(),
      url,
      body: params[requestBodyPropertyName],
      params: httpParams,
    };
  }

  private dispatch(
    apiName: string, method: string, path: string, mockPath: string, params: { [key: string]: any }, responseType: any,
    apiDispatchOptions,
  ) {
    const url = this.getUrlByPathAndParams(path, params);
    const apiRequest = this.creatApiRequest(method, url, params);

    const restAPI = {
      ...params, url,
      getApiName() { return apiName; },
      getMockPath() { return mockPath; },
      getRequestData() { return apiRequest; }
    };
    console.log(`RestApiService.dispatch()`, { restAPI });

    return this.dispatcher.dispatch(restAPI, apiDispatchOptions).pipe(
      map((x: any) => {
        x._body = responseType ? plainToClass(responseType, x.body) : responseType;
        return x;
      }),
      switchMap(x => from(this.validateBodyClass(x))),
      map((x: any) => x._body), // 因應res結構調整
    );
  }

  public dispatchRestApi<T>(name: string, params: any, apiDispatchOptions?: ApiDispatchOptions): Observable<T> {
    const restAPI = this.apiFactory.getApi(name);
    this.setAPIParams(restAPI, params);
    this.setUrl(restAPI, params);
    return throwError('dispatchRestApi() 方法已棄用');
    // return this.dispatcher.dispatch(restAPI, apiDispatchOptions).pipe(
    //   map((x: any) => {
    //       x._body = plainToClass(APIResponseMap[name], x.body);
    //       return x;
    //   }),
    //   switchMap(x => from(this.validateBodyClass(x))),
    //   map((x: any) => x._body), // 因應res結構調整
    // );
  }

  private setAPIParams(api: any, params: any) {
    for (const key in params) {
        api[key] = params[key];
    }
  }

  private setUrl(api: any, params: any) {
    let _url = this.apiConfig.API_URL[api.getApiName()];
    for (const key in params) {
        _url = _url.replace(new RegExp(`{${key}}`, 'g'), params[key]);
    }
    api.url = _url;
  }

  private async validateBodyClass(obj) {
    try {
        console.log(obj);
        await validateOrReject(obj.body);
        return obj;
    } catch (error) {
        throw error;
    }
  }

}
