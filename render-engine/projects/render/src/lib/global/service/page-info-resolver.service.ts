import { Injectable } from '@angular/core';
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
import { SiteMapGetResponseModel } from '../api/data-model/models/site-map-get-response.model';
import { ContentInfoModel } from '../api/data-model/models/content-info.model';

@Injectable({
  providedIn: 'root'
})
export class PageInfoResolverService implements Resolve<PageData> {

  constructor(
    private renderService: RenderService,
    private store: Store<RenderStore.RenderState>,
    private router: Router,

  ) { }

  /**
   * 再進入route前，先把pageInfo,sitemap,contentInfo撈完
   *
   * @param {ActivatedRouteSnapshot} route 當下route snapshot
   * @returns {Observable<PageData>}
   * @memberof PageInfoResolverService
   */
  resolve(route: ActivatedRouteSnapshot): Observable<PageData> {
    const context: 'preview' | 'runtime' = route.data.context;
    const pageID = route.params.pageID;
    const lang = route.params.languageID;


    const pageInfo$: Observable<PageInfoGetResponseModel> = this.renderService.getPageInfo(context, pageID, lang).pipe(shareReplay(1));
    const sitemap$: Observable<SiteMapGetResponseModel> = this.store.pipe(
      select(selectFetchSitemapStatus),
      filter(x => !x.pending && x.result !== null),
      first(),
      switchMap(state => iif(
        () => state.result === RequestStatus.Success,
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
      catchError(error => {
        console.log('error:', error);
        this.router.navigate(['error-page']);
        return throwError(error);
      })
    );

  }
}
