import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { tap, takeUntil, map, concatMap } from 'rxjs/operators';
import { SitemapService } from '../../../../global/api/service';
import { ModalService } from '../../../ui/modal';
import { CmsTree, TreeComponent } from '../../../ui/tree';
import { HtmlEditorService } from '../../../ui/html-editor';
import { SitemapNodeCreateModalComponent } from '../sitemap-node-create-modal/sitemap-node-create-modal.component';
import { MultiSiteNodeComponent, MultiSiteNodeCustomEvent } from '../multi-site-node/multi-site-node.component';
import { SiteMapNodeGetResponseModel } from '../../../../global/api/data-model/models/site-map-node-get-response.model';
import { SiteInfoModel } from '../../../../global/api/data-model/models/site-info.model';
import { SiteMapGetResponseModel } from '../../../../global/api/data-model/models/site-map-get-response.model';
import { CmsErrorHandler } from '../../../../global/error-handling';

enum EditModeType {
  SITE, NODE,
}

@Component({
  selector: 'cms-multi-site',
  templateUrl: './multi-site.component.html',
  styleUrls: ['./multi-site.component.scss']
})
export class MultiSiteComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('userSitemapTree') userSitemapTree: TreeComponent<SiteMapGetResponseModel>;

  EditModeType = EditModeType;

  sites: SiteInfoModel[] = [];
  selectedSite: SiteInfoModel;

  editMode: EditModeType = EditModeType.SITE;

  userSitemaps: SiteMapGetResponseModel[];
  selectedUserSitemap: SiteMapGetResponseModel; // from GetUserSiteMap

  customNodeRenderer = MultiSiteNodeComponent;

  selectedSitemapNode: SiteMapNodeGetResponseModel; // from GetSiteBySiteIDAndNodeID
  selectedSitemapNodeParentID: string;
  private nodeSelected$ = new Subject<SiteMapGetResponseModel>();

  private destroy$ = new Subject();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private modalService: ModalService,
    private sitemapService: SitemapService,
    private htmlEditorService: HtmlEditorService,
  ) { }

  ngOnInit(): void {
    this.registerSubjects();
    this.getSites().subscribe();
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  private getSites(): Observable<SiteInfoModel[]> {
    return this.sitemapService.getSiteList().pipe(
      CmsErrorHandler.rxHandleError('取得節點清單錯誤'),
      tap(sites => this.sites = sites),
      tap(_ => this.selectSite(this.sites[0])),
    );
  }

  selectSite(site: SiteInfoModel) {
    if (!site) { this.selectedSite = undefined; return; }
    this.selectedSite = site;
  }

  swichMode(mode: EditModeType) {
    this.userSitemaps = undefined;
    this.selectedSitemapNode = undefined;
    switch (mode) {
      case EditModeType.NODE:
        if (!this.selectedSite) { this.modalService.openMessage({ message: '尚未選擇網站' }); return; }
        this.sitemapService.getUserSiteMapNodes(this.selectedSite.siteId)
          .pipe(
            CmsErrorHandler.rxHandleError(),
          )
          .subscribe(userSitemaps => {
            this.userSitemaps = userSitemaps;
            this.editMode = mode;

            if (this.selectedUserSitemap) {
              const newNode = this.getNodeFromSitemapsByNodeID(this.selectedUserSitemap.nodeId, this.userSitemaps);
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

  onNodeSelected(event: { node: SiteMapGetResponseModel }) {
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
              siteId: this.selectedSite.siteId,
              parentId: event.data.nodeId,
            }
          });
          break;
        case event.ActionType.DELETE:
          action = of(undefined).pipe(
            this.modalService.confirmDelete,
            concatMap(_ => this.sitemapService.deleteUserSiteMap(event.data.nodeId).pipe(
              CmsErrorHandler.rxHandleError('刪除節點錯誤'),
              map(res => 'Deleted')
            ))
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
        this.getSiteNode(this.selectedSite.siteId, selectedUserSitemap.nodeId)
          .subscribe(selectedSitemapNode => {
            this.selectedSitemapNode = selectedSitemapNode;
            const parent = this.userSitemapTree.findParent(selectedUserSitemap);
            this.selectedSitemapNodeParentID = parent?.nodeId;
          });
      }
    });
  }

  private getSiteNode(siteId: string, nodeId: string) {
    return this.sitemapService.getUserSiteMapNodeByNodeId(siteId, nodeId).pipe(
      CmsErrorHandler.rxHandleError('取得節點資料錯誤'),
    );
  }

  onNodeUpdate() {
    this.swichMode(EditModeType.NODE);
  }

  private getNodeFromSitemapsByNodeID(nodeID: string, sitemaps: SiteMapGetResponseModel[]): SiteMapGetResponseModel {
    if (!sitemaps?.length) { return undefined; }
    const found = sitemaps.find(node => node.nodeId === nodeID);
    if (found) { return found; }
    const children: SiteMapGetResponseModel[] = sitemaps.reduce((a, b) => a.concat(b.children || []), []);
    return this.getNodeFromSitemapsByNodeID(nodeID, children);
  }

  testHtmlEditor() {
    this.htmlEditorService.openEditor({ content: '' }).subscribe(content => {
      if (content || content === '') {
        console.warn('content = ', content);
      }
    });
  }

  canDragNode(node: SiteMapGetResponseModel): boolean {
    return node.canOrder;
  }

  canDropOnNode(node: SiteMapGetResponseModel): boolean {
    return node.canAdd;
  }

  canDropOnNodePreviousNext(node: SiteMapGetResponseModel): boolean {
    return node.canOrder;
  }

  private reOrderSiteNode(targetNodeId: string, parentNodeId: string, order: number) {
    return this.sitemapService.reOrderSiteNode(targetNodeId, parentNodeId, 0).pipe(
      CmsErrorHandler.rxHandleError('移動節點錯誤'),
    );
  }

  onTreeDragToNode(ev: { target: SiteMapGetResponseModel, to: SiteMapGetResponseModel }) {
    const target = ev.target;
    const to = ev.to;
    if (!target || !to || target === to) { return; }
    this.modalService.openConfirm({ message: '確定移動節點?' }).subscribe(confirm => {
      if (!confirm) { return; }
      of(undefined).pipe(
        concatMap(_ => this.reOrderSiteNode(target.nodeId, to.nodeId, 0))
      ).subscribe(_ => {
        this.onNodeUpdate();
      });
    });
  }

  onTreeDragToPosition(ev: { target: SiteMapGetResponseModel, to: SiteMapGetResponseModel, order: number }) {
    const target = ev.target;
    const to = ev.to;
    const order = ev.order;
    if (!target || !to || target === to) { return; }
    this.modalService.openConfirm({ message: '確定移動節點?' }).subscribe(confirm => {
      if (!confirm) { return; }
      of(undefined).pipe(
        concatMap(_ => this.reOrderSiteNode(target.nodeId, to.nodeId, order))
      ).subscribe(_ => {
        this.onNodeUpdate();
      });
    });
  }

}
