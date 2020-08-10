import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Observable, concat, Subject, throwError, of } from 'rxjs';
import { tap, takeUntil, map, catchError, concatMap } from 'rxjs/operators';
import { SiteMapGetResponse } from '../../../../global/api/neuxAPI/bean/SiteMapGetResponse';
import { SiteInfo } from '../../../../global/api/neuxAPI/bean/SiteInfo';
import { SitemapService } from '../../../../global/api/service';
import { ModalService } from '../../../ui/modal';
import { CmsTree, TreeComponent } from '../../../ui/tree';
import { HtmlEditorService } from '../../../ui/html-editor';
import { SitemapNodeCreateModalComponent } from '../sitemap-node-create-modal/sitemap-node-create-modal.component';
import { MultiSiteNodeComponent, MultiSiteNodeCustomEvent } from '../multi-site-node/multi-site-node.component';
import { SiteMapNodeGetResponse } from '../../../../global/api/neuxAPI/bean/SiteMapNodeGetResponse';

enum EditModeType {
  SITE, NODE,
}

@Component({
  selector: 'cms-multi-site',
  templateUrl: './multi-site.component.html',
  styleUrls: ['./multi-site.component.scss']
})
export class MultiSiteComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('userSitemapTree') userSitemapTree: TreeComponent<SiteMapGetResponse>;

  EditModeType = EditModeType;

  sites: SiteInfo[] = [];
  selectedSite: SiteInfo;

  editMode: EditModeType = EditModeType.SITE;

  userSitemaps: SiteMapGetResponse[];
  selectedUserSitemap: SiteMapGetResponse; // from GetUserSiteMap

  customNodeRenderer = MultiSiteNodeComponent;

  selectedSitemapNode: SiteMapNodeGetResponse; // from GetSiteBySiteIDAndNodeID
  selectedSitemapNodeParentID: string;
  private nodeSelected$ = new Subject<SiteMapGetResponse>();

  private destroy$ = new Subject();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private modalService: ModalService,
    private sitemapService: SitemapService,
    private htmlEditorService: HtmlEditorService,
  ) { }

  ngOnInit(): void {
    this.registerSubjects();
    this.init().subscribe();
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  private init(): Observable<any> {
    return concat(
      this.getSites(),
    );
  }

  private getSites(): Observable<SiteInfo[]> {
    return this.sitemapService.getSiteList().pipe(
      tap(sites => this.sites = sites),
      tap(_ => this.selectSite(this.sites[0])),
    );
  }

  selectSite(site: SiteInfo) {
    if (!site) { this.selectedSite = undefined; return; }
    this.selectedSite = site;
  }

  swichMode(mode: EditModeType) {
    this.userSitemaps = undefined;
    this.selectedSitemapNode = undefined;
    switch (mode) {
      case EditModeType.NODE:
        if (!this.selectedSite) { this.modalService.openMessage({ message: '尚未選擇網站' }); return; }
        this.sitemapService.getUserSiteMapNodes(this.selectedSite.site_id).subscribe(userSitemaps => {
          this.userSitemaps = userSitemaps;
          this.editMode = mode;

          if (this.selectedUserSitemap) {
            const newNode = this.getNodeFromSitemapsByNodeID(this.selectedUserSitemap.node_id, this.userSitemaps);
            this.selectedUserSitemap = newNode;
            this.userSitemapTree.selectNode(newNode);
          }
        });
        break;
      case EditModeType.SITE:
        this.editMode = mode;
        break;
    }
  }

  onNodeSelected(event: { node: SiteMapGetResponse }) {
    this.nodeSelected$.next(event.node);
  }

  afterTreeRender(ev: { tree: CmsTree<any>, firstTime: boolean }) {
    if (!this.selectedUserSitemap) {
      const defaultSelect = this.userSitemaps ? this.userSitemaps[0] : undefined;
      ev.tree.selectNode(defaultSelect);
    }
  }

  onUserSiteMapTreeCustomEvent(event: MultiSiteNodeCustomEvent) {
    if (event instanceof MultiSiteNodeCustomEvent) {
      let action: Observable<any>;
      switch (event.action) {
        case event.ActionType.CREATE:
          action = this.modalService.openComponent({
            component: SitemapNodeCreateModalComponent,
            componentInitData: {
              siteId: this.selectedSite.site_id,
              parentId: event.data.node_id
            }
          });
          break;
        case event.ActionType.DELETE:
          action = this.sitemapService.deleteUserSiteMap(event.data.node_id).pipe(
            map(_ => 'Deleted')
          );
          break;
      }

      if (action) {
        action.pipe(tap(res => res ? this.swichMode(EditModeType.NODE) : null)).subscribe();
      }
    }
  }

  private registerSubjects() {
    this.nodeSelected$.pipe(
      takeUntil(this.destroy$),
    ).subscribe(selectedUserSitemap => {
      this.selectedUserSitemap = selectedUserSitemap;
      this.selectedSitemapNode = undefined;
      this.selectedSitemapNodeParentID = undefined;

      if (selectedUserSitemap) {
        this.sitemapService.getUserSiteMapNodeByNodeId(this.selectedSite.site_id, selectedUserSitemap.node_id).pipe(
          catchError(err => {
            alert(`取得節點錯誤 : ${selectedUserSitemap.node_name}`);
            return throwError(`取得節點錯誤 : ${selectedUserSitemap.node_name}`);
          })
        ).subscribe(selectedSitemapNode => {
          this.selectedSitemapNode = selectedSitemapNode;
          const parent = this.userSitemapTree.findParent(selectedUserSitemap);
          this.selectedSitemapNodeParentID = parent?.node_id;
        });
      }
    });
  }

  onNodeUpdate() {
    this.swichMode(EditModeType.NODE);
  }

  private getNodeFromSitemapsByNodeID(nodeID: string, sitemaps: SiteMapGetResponse[]): SiteMapGetResponse {
    if (!sitemaps?.length) { return undefined; }
    const found = sitemaps.find(node => node.node_id === nodeID);
    if (found) { return found; }
    const children: SiteMapGetResponse[] = sitemaps.reduce((a, b) => a.concat(b.children || []), []);
    return this.getNodeFromSitemapsByNodeID(nodeID, children);
  }

  testHtmlEditor() {
    this.htmlEditorService.openEditor({ content: '' }).subscribe(content => {
      if (content || content === '') {
        console.warn('content = ', content);
      }
    });
  }

  onTreeDragTo(ev: { target: SiteMapGetResponse, to: SiteMapGetResponse, order: number }) {
    const target = ev.target;
    const to = ev.to;
    const order = ev.order;
    if (!target || !to || target === to) { return; }
    // TODO: 移動節點 api
    this.modalService.openConfirm({ message: '確定移動節點?' }).subscribe(confirm => {
      if (!confirm) { return; }
      of(undefined).pipe(
        concatMap(_ => this.sitemapService.reOrderSiteNode(target.node_id, to.node_id, order))
      ).subscribe(_ => {
        this.onNodeUpdate();
      });
    });
  }

}
