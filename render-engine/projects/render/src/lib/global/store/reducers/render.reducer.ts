import { Action, createReducer, on } from '@ngrx/store';
import { SitemapNode } from '../../interface';
import * as RenderActions from '../actions/render.actions';
import { RequestStatus } from '../../enum';

export const renderFeatureKey = 'RenderState';

export interface RenderState {
  sitemapCache: { root: string, lang: string, sitemap: SitemapNode }[];
  sitemapRequestPending: boolean;
  sitemapRequestResultStatus: RequestStatus;

}

export const initialState: RenderState = {
  sitemapCache: [],
  sitemapRequestPending: false,
  sitemapRequestResultStatus: null
};


export const renderReducer = createReducer(
  initialState,
  on(
    RenderActions.fetchSitemapSuccess,
    (state, { lang, root, sitemap }) => ({
      ...state,
      sitemapRequestPending: false,
      sitemapRequestResultStatus: RequestStatus.Success,
      sitemapCache: [...state.sitemapCache, { root, lang, sitemap }]
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
  return reducer(state, action);
}

