import { createAction, props } from '@ngrx/store';
import { ApiContext } from '../../api/context-api-name-factory';
import { SitesResponseModel } from '../../api/data-model/models/sites-response.model';

export const fetchSitemap = createAction(
  '[Render] Fetch Sitemap',
  props<{ context: ApiContext, lang: string, root: string }>()
);

export const fetchSitemapSuccess = createAction(
  '[Render] Fetch Sitemap Success',
  props<{ sitemap: SitesResponseModel }>()
);

export const fetchSitemapFailure = createAction(
  '[Render] Fetch Sitemap Failure',
  props<{ error: any }>()
);
