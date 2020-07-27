import { Injectable, Inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import { ApiFactory, ApiDispatch, ConfigGetter, ApiConfig, ApiDispatchOptions } from '@neux/core';
import { map, switchMap } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { GetPageByPageIDAndLangAPI } from './api/GetPageByPageIDAndLangAPI';
import { GetPageByPageIDAPI } from './api/GetPageByPageIDAPI';
import { GetSiteMapByNodeIdAndLangAPI } from './api/GetSiteMapByNodeIdAndLangAPI';
import { GetSiteMapByNodeIdAPI } from './api/GetSiteMapByNodeIdAPI';
import { GetPreviewPageByPageIDAndLangAPI } from './api/GetPreviewPageByPageIDAndLangAPI';
import { GetPreviewPageByPageIDAPI } from './api/GetPreviewPageByPageIDAPI';
import { GetPreviewSiteMapByNodeIdAndLangAPI } from './api/GetPreviewSiteMapByNodeIdAndLangAPI';
import { GetPreviewSiteMapByNodeIdAPI } from './api/GetPreviewSiteMapByNodeIdAPI';
import { GetPreviewCompareByPageIDAPI } from './api/GetPreviewCompareByPageIDAPI';
import { GetSiteMapDownloadByFormatAPI } from './api/GetSiteMapDownloadByFormatAPI';
import { GetContentByContentIDAPI } from './api/GetContentByContentIDAPI';
import { GetPreviewContentByContentIDAPI } from './api/GetPreviewContentByContentIDAPI';

import { PageInfoGetResponse } from './bean/PageInfoGetResponse';
import { SiteMapGetResponse } from './bean/SiteMapGetResponse';
import { ContentInfo } from './bean/ContentInfo';


const APIResponseMap = {
  GetPageByPageIDAndLang: PageInfoGetResponse,
  GetPageByPageID: PageInfoGetResponse,
  GetSiteMapByNodeIdAndLang: SiteMapGetResponse,
  GetSiteMapByNodeId: SiteMapGetResponse,
  GetPreviewPageByPageIDAndLang: PageInfoGetResponse,
  GetPreviewPageByPageID: PageInfoGetResponse,
  GetPreviewSiteMapByNodeIdAndLang: SiteMapGetResponse,
  GetPreviewSiteMapByNodeId: SiteMapGetResponse,
  GetContentByContentID: ContentInfo,
  GetPreviewContentByContentID: ContentInfo,

};

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  private apiConfig: ApiConfig;

  constructor(
    private apiFactory: ApiFactory,
    private dispatcher: ApiDispatch,
    private configGetter: ConfigGetter,
  ) {
    this.apiConfig = this.configGetter.getApiConfig();
    this.apiFactory.registerApi(new GetPageByPageIDAndLangAPI());
    this.apiFactory.registerApi(new GetPageByPageIDAPI());
    this.apiFactory.registerApi(new GetSiteMapByNodeIdAndLangAPI());
    this.apiFactory.registerApi(new GetSiteMapByNodeIdAPI());
    this.apiFactory.registerApi(new GetPreviewPageByPageIDAndLangAPI());
    this.apiFactory.registerApi(new GetPreviewPageByPageIDAPI());
    this.apiFactory.registerApi(new GetPreviewSiteMapByNodeIdAndLangAPI());
    this.apiFactory.registerApi(new GetPreviewSiteMapByNodeIdAPI());
    this.apiFactory.registerApi(new GetPreviewCompareByPageIDAPI());
    this.apiFactory.registerApi(new GetSiteMapDownloadByFormatAPI());
    this.apiFactory.registerApi(new GetContentByContentIDAPI());
    this.apiFactory.registerApi(new GetPreviewContentByContentIDAPI());

  }

  public dispatchRestApi<T>(name: string, params: any, apiDispatchOptions?: ApiDispatchOptions): Observable<T> {
    const restAPI = this.apiFactory.getApi(name);
    this.setAPIParams(restAPI, params);
    this.setUrl(restAPI, params);
    return this.dispatcher.dispatch(restAPI, apiDispatchOptions).pipe(
      map(x => {
        x._body = plainToClass(APIResponseMap[name], x.body);
        return x;
      }),
      switchMap(x => from(this.validateBodyClass(x))),
      map(x => x._body), // 因應res結構調整
    );
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
