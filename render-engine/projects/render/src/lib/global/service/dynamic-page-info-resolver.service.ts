import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router, Resolve } from '@angular/router';
import { Observable, forkJoin, throwError, iif } from 'rxjs';
import { shareReplay, switchMap, catchError, tap, filter, first, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { RenderService } from './render.service';
import { PageData } from '../types/_index';
import * as RenderStore from '../store/reducers/render.reducer';
import { selectSitemap, selectFetchSitemapStatus } from '../store/selectors/render.selectors';
import { RequestStatus } from '../enum/_index';
import { fetchSitemap } from '../store/actions/render.actions';
import { PageInfoGetResponseModel } from '../api/data-model/models/page-info-get-response.model';
import { ContentInfoModel } from '../api/data-model/models/content-info.model';
import { ApiContext } from '../api/context-api-name-factory';
import { SiteMapGetResponseModel } from '../api/data-model/models/site-map-get-response.model';
import { DynamicInfoResponseModel } from '../api/data-model/models/dynamic-info-response.model';
import { SitemapUtil } from '../utils/sitemap-util';

@Injectable({
  providedIn: 'root'
})
export class DynamicPageInfoResolverService implements Resolve<PageData> {

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

    const funcID = route.params.funcID as string;
    const category = route.params.category as string;
    const dataID = route.params.dataID as string;

    const dynamicInfo$: Observable<DynamicInfoResponseModel>
      = this.renderService.getDynamicInfo(funcID, category, dataID).pipe(shareReplay(1));

    const pageInfo$: Observable<PageInfoGetResponseModel> = dynamicInfo$.pipe(map(r => r.pageInfo));
    const sitemap$: Observable<SiteMapGetResponseModel> = this.store.pipe(
      select(selectFetchSitemapStatus),
      filter(x => !x.pending && x.result !== null),
      first(),
      switchMap(state => iif(
        () => {
          return state.result === RequestStatus.Success;
        },
        pageInfo$.pipe(switchMap(x => this.store.pipe(
          select(selectSitemap),
          first()
        ))),
        // TODO: handle sitemap not found error
        throwError('Sitemap Not Found')))
    );
    const contentInfo$: Observable<ContentInfoModel> = dynamicInfo$.pipe(
      map(r => r.content)
    );

    // fetch Sitemap first
    pageInfo$.pipe(
      tap(x => this.store.dispatch(fetchSitemap({ context })))
    ).subscribe();

    return forkJoin({
      pageInfo: pageInfo$,
      sitemap: sitemap$,
      contentInfo: contentInfo$
    }).pipe(
      map(res => {
        const pageNode = SitemapUtil.findNodeByNodeIdFromSites(res.sitemap.sites, res.pageInfo.nodeParent);
        return { pageNode, ...res };
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('DynamicPageInfoResolverService.resolve() error = ', error);
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
