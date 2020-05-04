import { Component, OnInit } from '@angular/core';
import { Observable, of, concat } from 'rxjs';
import { tap } from 'rxjs/operators';

class Site {
  siteId: string;
  siteName: string;

  constructor(siteId: string, siteName: string) {
    this.siteId = siteId;
    this.siteName = siteName;
  }
}

@Component({
  selector: 'cms-multi-site',
  templateUrl: './multi-site.component.html',
  styleUrls: ['./multi-site.component.scss']
})
export class MultiSiteComponent implements OnInit {

  sites: Site[] = [];
  selectedSite: Site;

  editMode: 'site' | 'node' = 'site';

  constructor() { }

  ngOnInit(): void {
    this._init().subscribe();
  }

  private _init(): Observable<any> {
    return concat(
      this._getSites(),
    )
  }

  private _getSites(): Observable<Site[]> {
    return of([new Site('transglobe', 'Demo官網')]).pipe(
      tap(sites => this.sites = sites),
      tap(_ => this.selectSite(this.sites[0])),
    );
  }

  selectSite(site: Site) {
    this.selectedSite = site;
  }

  swichMode(mode: 'site' | 'node') {
    this.editMode = mode;
  }



}
