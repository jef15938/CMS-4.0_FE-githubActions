import { createAction, props } from '@ngrx/store';
import { SitemapNode } from '../../interface';

export const fetchSitemap = createAction(
  '[Render] Fetch Sitemap',
  props<{ context: 'preview' | 'runtime', lang: string, root: string }>()
);

export const fetchSitemapSuccess = createAction(
  '[Render] Fetch Sitemap Success',
  props<{ lang: string, root: string, sitemap: SitemapNode }>()
);

export const fetchSitemapFailure = createAction(
  '[Render] Fetch Sitemap Failure',
  props<{ error: any }>()
);
