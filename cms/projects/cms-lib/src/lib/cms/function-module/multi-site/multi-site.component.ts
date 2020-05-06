import { Component, OnInit } from '@angular/core';
import { Observable, concat } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ModalService } from '../../../ui/modal/modal.service';
import { SitemapService } from '../../../service/sitemap.service';
import { SiteMapInfo } from '../../../neuxAPI/bean/SiteMapInfo';
import { MultiSiteNodeComponent, MultiSiteNodeCustomEvent } from './component/multi-site-node/multi-site-node.component';
import { CmsTree } from '../../../ui/tree/tree.interface';
import { SiteInfo } from '../../../neuxAPI/bean/SiteInfo';

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
export class MultiSiteComponent implements OnInit {

  EditModeType = EditModeType;

  sites: SiteInfo[] = [];
  selectedSite: SiteInfo;
  selectedSiteUpdateModel: SiteInfoUpdateModel;

  editMode: EditModeType = EditModeType.Site;

  sitemaps: SiteMapInfo[];
  selectedSiteMap: SiteMapInfo;
  customNodeRenderer = MultiSiteNodeComponent;

  constructor(
    private _modalService: ModalService,
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
    switch (mode) {
      case EditModeType.Node:
        if (!this.selectedSite) { this._modalService.openMessage({ message: '尚未選擇網站' }); return; }
        this._sitemapService.getUserSiteMap(this.selectedSite.site_id).subscribe(sitemap => {
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
  }

  afterTreeRender(tree: CmsTree<SiteMapInfo>) {
    const defaultSelect = this.sitemaps ? this.sitemaps[0] : undefined;
    tree.selectNode(defaultSelect);
  }

  onCustomEvent(event: MultiSiteNodeCustomEvent) {
    if (event instanceof MultiSiteNodeCustomEvent) {
      switch (event.action) {
        case 'Create':
        case 'Delete':
          // this.openModal(event.action, event.dept).subscribe(res => {
          //   if (res) {
          //     this._initPage().subscribe();
          //   }
          // });
          break;
      }
    }
  }

}
