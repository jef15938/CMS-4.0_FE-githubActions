import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { SitemapService } from '../service/sitemap.service';

@Injectable({
  providedIn: 'root'
})
export class CommonStoreService {
  private sitemap: any = null;
  private sitemapSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private sitemapService: SitemapService
  ) { }

  getSitemap() {
    if (!this.sitemap) {
      return this.sitemapService.getSitemap().pipe(
        tap(resp => this.setSitemap(resp)),
        switchMap(() => this.sitemapSubject.asObservable())
      );
    }
    else {
      return this.sitemapSubject.asObservable();
    }
  }

  setSitemap(sitemap: any) {
    this.sitemap = sitemap;
    this.sitemapSubject.next(this.sitemap);
  }
}
