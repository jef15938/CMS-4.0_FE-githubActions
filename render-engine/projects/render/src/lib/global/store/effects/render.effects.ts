import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as RenderActions from '../actions/render.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { RenderService } from '../../service/render.service';
import { of } from 'rxjs';



@Injectable()
export class RenderEffects {



  constructor(
    private actions$: Actions,
    private renderService: RenderService
  ) { }

  fetchSitemap$ = createEffect(() => this.actions$.pipe(
    ofType(RenderActions.fetchSitemap),
    switchMap(({ context, lang, root }) =>
      this.renderService.getSitemap(context, root, lang).pipe(
        map(sitemap => RenderActions.fetchSitemapSuccess({ lang, root, sitemap })),
        catchError((error) => of(RenderActions.fetchSitemapFailure(error)))
      )
    )
  ));

}
