import { Component, OnInit } from '@angular/core';
import { Observable, of, concat } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DialogService } from '../../../ui/dialog/dialog.service';
import { SitemapService } from '../../../service/sitemap.service';
import { SiteMapInfo } from '../../../neuxAPI/bean/SiteMapInfo';
import { MultiSiteNodeComponent, MultiSiteNodeCustomEvent } from './component/multi-site-node/multi-site-node.component';
import { CmsTree } from '../../../ui/tree/tree.interface';

enum EditModeType {
  Site, Node,
}

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

  EditModeType = EditModeType;

  sites: Site[] = [];
  selectedSite: Site;

  editMode: EditModeType = EditModeType.Site;

  sitemaps: SiteMapInfo[];
  selectedSiteMap: SiteMapInfo;
  customNodeRenderer = MultiSiteNodeComponent;

  constructor(
    private _dialogService: DialogService,
    private _sitemapService: SitemapService,
  ) { }

  ngOnInit(): void {
    this._init().subscribe();
  }

  private _init(): Observable<any> {
    return concat(
      this._getSites(),
    )
  }

  private _getSites(): Observable<Site[]> {
    return of([
      new Site('transglobe', 'Demo官網'),
      new Site('transglobe', 'My官網'),
    ]).pipe(
      tap(sites => this.sites = sites),
      tap(_ => this.selectSite(this.sites[0])),
    );
  }

  selectSite(site: Site) {
    this.selectedSite = site;
  }

  swichMode(mode: EditModeType) {
    switch (mode) {
      case EditModeType.Node:
        if (!this.selectedSite) { this._dialogService.openMessage({ message: '尚未選擇網站' }); return; }
        this._sitemapService.getUserSiteMap(this.selectedSite.siteId).subscribe(sitemap => {
          this.sitemaps = sitemap;
          this.editMode = mode;
        });
        break;
      case EditModeType.Site:
        this.sitemaps = undefined;
        this.selectedSiteMap = undefined;
        this.editMode = mode;
        break;
    }
  }

  onNodeSelected(event: { node: SiteMapInfo }) {
    const node = event.node;
    console.warn('onNodeSelected() node = ', node);
  }

  afterTreeRender(tree: CmsTree<SiteMapInfo>) {
    const defaultSelect = this.sitemaps ? this.sitemaps[0] : undefined;
    tree.selectNode(defaultSelect);
  }

  onCustomEvent(event: MultiSiteNodeCustomEvent) {
    console.warn('onCustomEvent() event = ', event);
    if (event instanceof MultiSiteNodeCustomEvent) {
      switch (event.action) {
        case 'Create':
        case 'Delete':
          // this.openDialog(event.action, event.dept).subscribe(res => {
          //   if (res) {
          //     this._initPage().subscribe();
          //   }
          // });
          break;
      }
    }
  }

}
