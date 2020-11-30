import { Action, createReducer, on } from '@ngrx/store';
import * as RenderActions from '../actions/render.actions';
import { RequestStatus } from '../../enum/_index';
import { SiteMapGetResponseModel } from '../../api/data-model/models/site-map-get-response.model';

export const renderFeatureKey = 'RenderState';

export interface RenderState {
  sitemapCache: SiteMapGetResponseModel;
  sitemapRequestPending: boolean;
  sitemapRequestResultStatus: RequestStatus;

}

export const initialState: RenderState = {
  sitemapCache: null,
  sitemapRequestPending: false,
  sitemapRequestResultStatus: null
};


export const renderReducer = createReducer(
  initialState,
  on(
    RenderActions.fetchSitemapSuccess,
    (state, { sitemap }) => ({
      ...state,
      sitemapRequestPending: false,
      sitemapRequestResultStatus: RequestStatus.Success,
      sitemapCache: sitemap
    })
  ),
  on(
    RenderActions.fetchSitemapFailure,
    (state) => ({
      ...state,
      sitemapRequestPending: false,
      sitemapRequestResultStatus: RequestStatus.Fail
    })
  ),
);


export function reducer(state: RenderState | undefined, action: Action) {
  return renderReducer(state, action);
}

