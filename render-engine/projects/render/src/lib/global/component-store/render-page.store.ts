import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { SiteMapInfoModel } from '../api/data-model/models/site-map-info.model';
import { PageInfoGetResponseModel } from '../api/data-model/models/page-info-get-response.model';
import { SiteMapGetResponseModel } from '../api/data-model/models/site-map-get-response.model';

export interface RenderPageState {
  /** 是 瀏覽器 */
  isBrowser: boolean;
  /** 是 用在編輯器 -> 與 isRender 相反 */
  isEditor: boolean;
  /** 是 用在渲染 -> 與 isEditor 相反 */
  isRender: boolean;
  /** 是 preview */
  isPreview: boolean;
  /** 是 runtime */
  isRuntime: boolean;
  /** 當前頁面節點 */
  pageNode: SiteMapInfoModel;
  /** 頁面有關的資料 */
  pageInfo: PageInfoGetResponseModel;
  /** 整個 Sitemap */
  sitemap: SiteMapGetResponseModel;
}

@Injectable()
export class RenderPageStore extends ComponentStore<RenderPageState> {

  readonly renderState$: Observable<RenderPageState> = this.select(state => ({ ...state }));

  constructor() {
    super();
  }

}
