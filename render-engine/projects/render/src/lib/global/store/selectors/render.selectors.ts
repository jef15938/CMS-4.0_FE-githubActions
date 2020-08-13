import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RenderState, renderFeatureKey } from '../reducers/render.reducer';

export const selectRenderState = createFeatureSelector<RenderState>(renderFeatureKey);
export const selectSitemap = createSelector(
  selectRenderState,
  (state: RenderState, props: { root: string, lang: string }) => state.sitemapCache.find(x => x.lang === props.lang && x.root === props.root)?.sitemap
);

export const selectFetchSitemapStatus = createSelector(
  selectRenderState,
  (state: RenderState) => ({ pending: state.sitemapRequestPending, result: state.sitemapRequestResultStatus })
);
