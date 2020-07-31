import { Injectable } from '@angular/core';
import { RenderService } from './render.service';
import { ActivatedRouteSnapshot, Router, Resolve } from '@angular/router';
import { Observable, forkJoin, of, throwError } from 'rxjs';
import { PageInfo } from '../interface/page-info.interface';
import { shareReplay, switchMap, take, catchError } from 'rxjs/operators';
import { CommonStoreService } from '../store/common-store.service';
import { ContentInfo, SitemapNode } from '../interface';
import { PageData } from '../types';



@Injectable({
  providedIn: 'root'
})
export class PageInfoResolverService implements Resolve<PageData> {

  constructor(
    private renderService: RenderService,
    private storeService: CommonStoreService,
    private router: Router

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

    const pageInfo$: Observable<PageInfo> = this.renderService.getPageInfo(context, pageID, lang).pipe(shareReplay(1));
    const sitemap$: Observable<SitemapNode> = pageInfo$.pipe(
      switchMap((x) => this.storeService.getSitemap(context, x.nodeRoot, x.lang).pipe(take(1)))
    );
    const contentInfo$: Observable<ContentInfo> = pageInfo$.pipe(
      switchMap((x) => this.renderService.getContentInfo(context, x.contentID))
    );

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
