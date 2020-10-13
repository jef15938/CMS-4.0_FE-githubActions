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
import { FullSearchGetResponse } from './bean/FullSearchGetResponse';



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
    apiName: 'GetPageByPageIdAndLang',
    method: 'get',
    path: '/Page/{page_id}/{lang}',
    mock: './assets/mock/GetPageByPageIdAndLang.json',
    responseType: PageInfoGetResponse
  })
  GetPageByPageIdAndLang(
    params: { page_id: string, lang: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<PageInfoGetResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetPageByPageId',
    method: 'get',
    path: '/Page/{page_id}',
    mock: './assets/mock/GetPageByPageId.json',
    responseType: PageInfoGetResponse
  })
  GetPageByPageId(
    params: { page_id: string, },
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
    apiName: 'GetPreviewPageByPageIdAndLang',
    method: 'get',
    path: '/Preview/Page/{page_id}/{lang}',
    mock: './assets/mock/GetPreviewPageByPageIdAndLang.json',
    responseType: PageInfoGetResponse
  })
  GetPreviewPageByPageIdAndLang(
    params: { page_id: string, lang: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<PageInfoGetResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetPreviewPageByPageId',
    method: 'get',
    path: '/Preview/Page/{page_id}',
    mock: './assets/mock/GetPreviewPageByPageId.json',
    responseType: PageInfoGetResponse
  })
  GetPreviewPageByPageId(
    params: { page_id: string, },
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
    apiName: 'GetPreviewCompareByPageId',
    method: 'get',
    path: '/Preview/Compare/{page_id}',
    mock: './assets/mock/GetPreviewCompareByPageId.json',
    responseType: null
  })
  GetPreviewCompareByPageId(
    params: { page_id: string, },
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
  GetSiteMapDownloadByFormat(
    params: { format: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<any> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetContentByContentId',
    method: 'get',
    path: '/Content/{content_id}',
    mock: './assets/mock/GetContentByContentId.json',
    responseType: ContentInfo
  })
  GetContentByContentId(
    params: { content_id: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<ContentInfo> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetPreviewContentByContentId',
    method: 'get',
    path: '/Preview/Content/{content_id}',
    mock: './assets/mock/GetPreviewContentByContentId.json',
    responseType: ContentInfo
  })
  GetPreviewContentByContentId(
    params: { content_id: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<ContentInfo> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetDataSourceByTypeIdAndId',
    method: 'get',
    path: '/DataSource/{type_id}/{id}',
    mock: './assets/mock/GetDataSourceByTypeIdAndId.json',
    responseType: ListDataSourceDataResponse
  })
  GetDataSourceByTypeIdAndId(
    params: { type_id: string, id: string, pageSize?: number, page?: number, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<ListDataSourceDataResponse> { return null; }

  // @dynamic
  @RestApi({
    apiName: 'GetFullSearch',
    method: 'get',
    path: '/FullSearch',
    mock: './assets/mock/GetFullSearch.json',
    responseType: FullSearchGetResponse
  })
  GetFullSearch(
    params: { keyword: string, type?: string, pageSize?: string, page?: string, },
    apiDispatchOptions?: ApiDispatchOptions,
  ): Observable<FullSearchGetResponse> { return null; }

  private getUrlByPathAndParams(path: string, params: { [key: string]: any }) {
    let url = path;
    const pathParameters = [];
    for (const key in params) {
      const tester = new RegExp(`{${key}}`, 'g');
      if (tester.test(url)) {
        pathParameters.push(key);
        url = url.replace(new RegExp(`{${key}}`, 'g'), params[key]);
      }
    }
    pathParameters.forEach(p => {
      delete params[p];
    });
    return `${this.apiBaseUrl}${url}`;
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
    for (let key in params) {
        api[key] = params[key];
    }
  }

  private setUrl(api: any, params: any) {
    let _url = this.apiConfig.API_URL[api.getApiName()];
    for (let key in params) {
        _url = _url.replace(new RegExp(`{${key}}`, 'g'), params[key]);
    }
    api.url = _url;
  }

  private async validateBodyClass(obj) {
    try {
        console.log(obj)
        await validateOrReject(obj.body);
        return obj;
    } catch (error) {
        throw error;
    }
  }

}