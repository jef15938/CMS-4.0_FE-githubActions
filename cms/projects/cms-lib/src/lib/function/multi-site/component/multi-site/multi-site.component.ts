import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Observable, concat, Subject, throwError } from 'rxjs';
import { tap, takeUntil, map, catchError } from 'rxjs/operators';
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

  @ViewChild('sitemapTree') sitemapTree: TreeComponent<SiteMapGetResponse>;

  EditModeType = EditModeType;

  sites: SiteInfo[] = [];
  selectedSite: SiteInfo;

  editMode: EditModeType = EditModeType.SITE;

  sitemaps: SiteMapGetResponse[];

  customNodeRenderer = MultiSiteNodeComponent;
  selectedNode: SiteMapNodeGetResponse;
  selectedNodeParentID: string;
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
    this.sitemaps = undefined;
    this.selectedNode = undefined;
    switch (mode) {
      case EditModeType.NODE:
        if (!this.selectedSite) { this.modalService.openMessage({ message: '尚未選擇網站' }); return; }
        this.sitemapService.getUserSiteMapNodes(this.selectedSite.site_id).subscribe(sitemap => {
          this.sitemaps = sitemap;
          this.editMode = mode;
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

  afterTreeRender(tree: CmsTree<SiteMapGetResponse>) {
    const defaultSelect = this.sitemaps ? this.sitemaps[0] : undefined;
    tree.selectNode(defaultSelect);
  }

  onSiteMapTreeCustomEvent(event: MultiSiteNodeCustomEvent) {
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
    ).subscribe(selectedNode => {
      if (selectedNode) {
        this.sitemapService.getUserSiteMapNodeByNodeId(this.selectedSite.site_id, selectedNode.node_id).pipe(
          catchError(err => {
            alert(`取得節點錯誤 : ${selectedNode.node_name}`);
            return throwError(`取得節點錯誤 : ${selectedNode.node_name}`);
          })
        ).subscribe(selectedSitemapNode => {
          this.selectedNode = selectedSitemapNode;
          const parent = this.sitemapTree.findParent(selectedNode);
          this.selectedNodeParentID = parent?.node_id;
        });
      }
    });
  }

  onNodeUpdate(reset = false) {
    if (reset) {
      this.swichMode(EditModeType.NODE);
    } else {
      const selectedNodeID = this.selectedNode.node_id;
      const selectedNode = this.getNodeFromSitemapsByNodeID(selectedNodeID, this.sitemaps);
      this.nodeSelected$.next(selectedNode);
    }
  }

  private getNodeFromSitemapsByNodeID(nodeID: string, sitemaps: SiteMapGetResponse[]): SiteMapGetResponse {
    if (!sitemaps?.length) { return undefined; }
    const found = sitemaps.find(node => node.node_id === nodeID);
    if (found) { return found; }
    const children: SiteMapGetResponse[] = sitemaps.reduce((a, b) => a.concat(b.children || []), []);
    return this.getNodeFromSitemapsByNodeID(nodeID, children);
  }

  testHtmlEditor() {
    this.htmlEditorService.openEditor({
      // title: `Html編輯`,
      content: ''
    }).subscribe(content => {
      if (content || content === '') {
        console.warn('content = ', content);
      }
    });
  }

  onTreeDragTo(ev: { target: SiteMapGetResponse, to: SiteMapGetResponse }) {
    const target = ev.target;
    const to = ev.to;
    if (!target || !to || target === to || to.children.indexOf(target) > -1) { return; }
    // TODO: 移動節點 api
    // this.modalService.openConfirm({ message: '確定移動節點?' }).subscribe(confirm => {
    //   if (!confirm) { return; }
    //   of(undefined).pipe(
    //     concatMap(_ => this.sitemapService.getUserSiteMapNodeByNodeId(this.selectedSite.site_id, target.node_id)),
    //     concatMap(nodeToUpdate => {
    //       return this.sitemapService.updateSiteNode(
    //         nodeToUpdate.node_id,
    //         nodeToUpdate.details,
    //         {
    //           parent_id: to.node_id,
    //           content_path: nodeToUpdate.content_path,
    //           url_type: nodeToUpdate.url_type,
    //           url_link_node_id: nodeToUpdate.url_link_node_id,
    //           url: nodeToUpdate.url,
    //           url_blank: nodeToUpdate.url_blank,
    //         }
    //       );
    //     }),
    //   ).subscribe(_ => {
    //     this.onNodeUpdate(true);
    //   });
    // });
  }

}
