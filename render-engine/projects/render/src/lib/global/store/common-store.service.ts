import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap, map, distinctUntilChanged, mapTo } from 'rxjs/operators';
import { SitemapService } from '../service/sitemap.service';
import { convertSitemapNode } from '../utils/object-converter';
import { SitemapNode } from '../interface/sitemap-node.interface';

@Injectable({
  providedIn: 'root'
})
export class CommonStoreService {
  private sitemap: object = {};
  private sitemapSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private sitemapService: SitemapService
  ) { }

  /**
   * 取得sitemap,若當前無該節點/語系的sitemap則重撈，有則直接回傳
   *
   * @param {string} root
   * @param {string} lang
   * @returns {Observable<SitemapNode>}
   * @memberof CommonStoreService
   */
  getSitemap(root: string, lang: string): Observable<SitemapNode> {
    const sitemap$ = this.sitemapSubject.asObservable().pipe(
      tap((x) => console.log('siteMapSubject:', x)),
      map(x => x[root][lang]),
      distinctUntilChanged()
    );
    if (!this.sitemap[root] || !this.sitemap[root][lang]) {
      return this.sitemapService.getSitemap(root, lang).pipe(
        map(x => convertSitemapNode(x)),
        tap(resp => this.setSitemap(root, lang, resp)),
        switchMap(() => sitemap$)
      );
    }
    else {
      return sitemap$;
    }
  }

  /**
   * sitemap存入store 中
   *
   * @param {string} root
   * @param {string} lang
   * @param {SitemapNode} sitemap
   * @memberof CommonStoreService
   */
  setSitemap(root: string, lang: string, sitemap: SitemapNode) {
    if (!this.sitemap[root]) {
      this.sitemap[root] = {};
    }
    this.sitemap[root][lang] = sitemap;
    this.sitemapSubject.next(this.sitemap);
  }
}
