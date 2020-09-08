import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { RenderService } from './render.service';
import { ActivatedRouteSnapshot, Router, Resolve } from '@angular/router';
import { Observable, forkJoin, throwError, iif } from 'rxjs';
import { shareReplay, switchMap, catchError, tap, filter, first } from 'rxjs/operators';
import { PageData } from '../types';
import { Store, select } from '@ngrx/store';
import * as RenderStore from '../store/reducers/render.reducer';
import { selectSitemap, selectFetchSitemapStatus } from '../store/selectors/render.selectors';
import { RequestStatus } from '../enum';
import { fetchSitemap } from '../store/actions/render.actions';
import { PageInfoGetResponseModel } from '../api/data-model/models/page-info-get-response.model';
import { ContentInfoModel } from '../api/data-model/models/content-info.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiContext } from '../api/context-api-name-factory';
import { isPlatformBrowser } from '@angular/common';
import { SitesResponseModel } from '../api/data-model/models/sites-response.model';

@Injectable({
  providedIn: 'root'
})
export class PageInfoResolverService implements Resolve<PageData> {

  constructor(
    private renderService: RenderService,
    private store: Store<RenderStore.RenderState>,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any,
  ) { }

  /**
   * 再進入route前，先把pageInfo,sitemap,contentInfo撈完
   *
   * @param {ActivatedRouteSnapshot} route 當下route snapshot
   * @returns {Observable<PageData>}
   * @memberof PageInfoResolverService
   */
  resolve(route: ActivatedRouteSnapshot): Observable<PageData> {
    const context: ApiContext = isPlatformBrowser(this.platformId) ? route.data.context : 'batchSSR';
    const pageID = route.params.pageID;
    const lang = route.params.languageID;

    const pageInfo$: Observable<PageInfoGetResponseModel> = this.renderService.getPageInfo(context, pageID, lang).pipe(shareReplay(1));
    const sitemap$: Observable<SitesResponseModel> = this.store.pipe(
      select(selectFetchSitemapStatus),
      filter(x => !x.pending && x.result !== null),
      first(),
      switchMap(state => iif(
        () => {
          return state.result === RequestStatus.Success;
        },
        pageInfo$.pipe(switchMap(x => this.store.pipe(
          select(selectSitemap, { root: x.nodeRoot, lang: x.lang }),
          first()
        ))),
        // TODO: handle sitemap not found error
        throwError('Sitemap Not Found')))
    );
    const contentInfo$: Observable<ContentInfoModel> = pageInfo$.pipe(
      switchMap((x) => this.renderService.getContentInfo(context, x.contentId))
    );

    // fetch Sitemap first
    pageInfo$.pipe(
      tap(x => this.store.dispatch(fetchSitemap({ context, lang: x.lang, root: x.nodeRoot })))
    ).subscribe();
    return forkJoin({
      pageInfo: pageInfo$,
      sitemap: sitemap$,
      contentInfo: contentInfo$
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('PageInfoResolverService.resolve() error = ', error);
        this.router.navigate(['error-page'], {
          state: {
            error: {
              error: error.error,
              message: error.message,
            },
          }
        });
        return throwError(error);
      })
    );

  }
}
