import { Injectable } from '@angular/core';
import { RenderService } from './render.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { PageInfo } from '../interface/page-info.interface';
import { shareReplay, switchMap } from 'rxjs/operators';
import { CommonStoreService } from '../store/common-store.service';
import { ContentInfo, SitemapNode } from '../interface';
import { PageData } from '../types';



@Injectable({
  providedIn: 'root'
})
export class PageInfoResolverService {

  constructor(
    private renderService: RenderService,
    private storeService: CommonStoreService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<PageData> {
    const pageID = route.params.pageID;
    const lang = route.params.languageID;

    const pageInfo$: Observable<PageInfo> = this.renderService.getPageInfo(pageID, lang).pipe(shareReplay(1));
    const sitemap$: Observable<SitemapNode> = pageInfo$.pipe(
      switchMap((x) => this.storeService.getSitemap(x.nodeRoot, x.lang))
    );
    const contentInfo$: Observable<ContentInfo> = pageInfo$.pipe(
      switchMap((x) => this.renderService.getContentInfo(x.contentID))
    );

    return forkJoin({
      pageInfo: pageInfo$,
      sitemap: sitemap$,
      contentInfo: contentInfo$
    });

  }
}
