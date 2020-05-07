import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable, concat, Subject } from 'rxjs';
import { tap, takeUntil, debounceTime } from 'rxjs/operators';
import { ModalService } from '../../../ui/modal/modal.service';
import { SitemapService } from '../../../service/sitemap.service';
import { SiteMapInfo } from '../../../neuxAPI/bean/SiteMapInfo';
import { MultiSiteNodeComponent, MultiSiteNodeCustomEvent } from './component/multi-site-node/multi-site-node.component';
import { CmsTree } from '../../../ui/tree/tree.interface';
import { SiteInfo } from '../../../neuxAPI/bean/SiteInfo';
import { TreeComponent } from '../../../ui/tree/tree.component';
import { SitemapNodeCreateModalComponent } from './component/sitemap-node-create-modal/sitemap-node-create-modal.component';

enum EditModeType {
  Site, Node,
}

class SiteInfoUpdateModel extends SiteInfo {
  constructor(siteInfo: SiteInfo) {
    super();
    for (let k of Object.keys(siteInfo)) {
      this[k] = siteInfo[k];
    }
  }
}

@Component({
  selector: 'cms-multi-site',
  templateUrl: './multi-site.component.html',
  styleUrls: ['./multi-site.component.scss']
})
export class MultiSiteComponent implements OnInit, OnDestroy {

  @ViewChild('sitemapTree') sitemapTree: TreeComponent<SiteMapInfo>;

  EditModeType = EditModeType;

  sites: SiteInfo[] = [];
  selectedSite: SiteInfo;
  selectedSiteUpdateModel: SiteInfoUpdateModel;

  editMode: EditModeType = EditModeType.Site;

  sitemaps: SiteMapInfo[];
  selectedSiteMap: SiteMapInfo;
  selectedSiteMapParendId: string;
  customNodeRenderer = MultiSiteNodeComponent;
  private _sitemapSelected$ = new Subject<SiteMapInfo>();

  private _destroy$ = new Subject();

  constructor(
    private _modalService: ModalService,
    private _sitemapService: SitemapService,
  ) { }

  ngOnInit(): void {
    this._registerSubjects();
    this._init().subscribe();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._destroy$.unsubscribe();
  }

  private _init(): Observable<any> {
    return concat(
      this._getSites(),
    )
  }

  private _getSites(): Observable<SiteInfo[]> {
    return this._sitemapService.getSiteList().pipe(
      tap(sites => this.sites = sites),
      tap(_ => this.selectSite(this.sites[0])),
    );
  }

  selectSite(site: SiteInfo) {
    if (!site) { this.selectedSite = this.selectedSiteUpdateModel = undefined; return; }
    this.selectedSite = site;
    this.selectedSiteUpdateModel = new SiteInfoUpdateModel(this.selectedSite);
  }

  swichMode(mode: EditModeType) {
    this.sitemaps = undefined;
    this.selectedSiteMap = undefined;
    this.selectedSiteMapParendId = undefined;
    switch (mode) {
      case EditModeType.Node:
        if (!this.selectedSite) { this._modalService.openMessage({ message: '尚未選擇網站' }); return; }
        this._sitemapService.getUserSiteMap(this.selectedSite.site_id).subscribe(sitemap => {
          this.sitemaps = sitemap;
          this.editMode = mode;
        });
        break;
      case EditModeType.Site:
        this.editMode = mode;
        break;
    }
  }

  onNodeSelected(event: { node: SiteMapInfo }) {
    this._sitemapSelected$.next(event.node);
  }

  afterTreeRender(tree: CmsTree<SiteMapInfo>) {
    const defaultSelect = this.sitemaps ? this.sitemaps[0] : undefined;
    tree.selectNode(defaultSelect);
  }

  onCustomEvent(event: MultiSiteNodeCustomEvent) {
    if (event instanceof MultiSiteNodeCustomEvent) {
      switch (event.action) {
        case event.ActionType.Create:
          this._modalService.openComponent({
            component: SitemapNodeCreateModalComponent,
            componentInitData: {
              parent_id: event.data.node_id
            }
          }).subscribe(res => {
            if (res) {
              this.swichMode(EditModeType.Node);
            }
          });
          break;
        case event.ActionType.Delete:
          break;
      }
    }
  }

  private _registerSubjects() {
    this._sitemapSelected$.pipe(
      debounceTime(300),
      takeUntil(this._destroy$)
    ).subscribe(selectedSitemap => {
      this.selectedSiteMap = selectedSitemap;
      this.selectedSiteMapParendId = this.sitemapTree.findParent(selectedSitemap)?.node_id;
    });
  }

  getSelectedSitemapParentId() {
    return this.sitemapTree && this.selectedSiteMap
      ? this.sitemapTree.findParent(this.selectedSiteMap)?.node_id
      : undefined;
  }

  onSiteMapUpdated(ev) {
    this.swichMode(EditModeType.Node);
  }

}
