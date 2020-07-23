import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { CommonStoreService } from '../store/common-store.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SitemapResolverService implements Resolve<any> {

  constructor(
    private commonStore: CommonStoreService
  ) { }

  resolve() {
    return this.commonStore.getSitemap().pipe(take(1));
  }
}
