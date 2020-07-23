import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Observable, concat, Subject, forkJoin, of, NEVER, throwError } from 'rxjs';
import { tap, takeUntil, concatMap, map, throttleTime, catchError, switchMap } from 'rxjs/operators';
import { SiteMapGetResponse } from '../../../../global/api/neuxAPI/bean/SiteMapGetResponse';
import { SiteInfo } from '../../../../global/api/neuxAPI/bean/SiteInfo';
import { SitemapService, ContentService } from '../../../../global/api/service';
import { ModalService } from '../../../ui/modal';
import { CmsTree, TreeComponent } from '../../../ui/tree';
import { ContentEditorService, EditorMode } from '../../../ui/content-editor';
import { HtmlEditorService } from '../../../ui/html-editor';
import { SiteMapUpdateInfo } from './../../../../global/interface';
import { SitemapNodeCreateModalComponent } from '../sitemap-node-create-modal/sitemap-node-create-modal.component';
import { MultiSiteNodeComponent, MultiSiteNodeCustomEvent } from '../multi-site-node/multi-site-node.component';

enum EditModeType {
  Site, Node,
}

class SiteInfoUpdateModel extends SiteInfo {
  constructor(siteInfo: SiteInfo) {
    super();
    for (const k of Object.keys(siteInfo)) {
      this[k] = siteInfo[k];
    }
  }
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
  selectedSiteUpdateModel: SiteInfoUpdateModel;

  editMode: EditModeType = EditModeType.Site;

  sitemaps: SiteMapGetResponse[];

  customNodeRenderer = MultiSiteNodeComponent;
  selectedNode: SiteMapUpdateInfo;
  private nodeSelected$ = new Subject<SiteMapGetResponse>();

  private destroy$ = new Subject();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private modalService: ModalService,
    private sitemapService: SitemapService,
    private contentService: ContentService,
    private contentEditorService: ContentEditorService,
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
    if (!site) { this.selectedSite = this.selectedSiteUpdateModel = undefined; return; }
    this.selectedSite = site;
    this.selectedSiteUpdateModel = new SiteInfoUpdateModel(this.selectedSite);
  }

  swichMode(mode: EditModeType) {
    this.sitemaps = undefined;
    this.selectedNode = undefined;
    switch (mode) {
      case EditModeType.Node:
        if (!this.selectedSite) { this.modalService.openMessage({ message: '尚未選擇網站' }); return; }
        this.sitemapService.getUserSiteMapNodes(this.selectedSite.site_id).subscribe(sitemap => {
          this.sitemaps = sitemap;
          this.editMode = mode;
        });
        break;
      case EditModeType.Site:
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
        case event.ActionType.Create:
          action = this.modalService.openComponent({
            component: SitemapNodeCreateModalComponent,
            componentInitData: {
              siteId: this.selectedSite.site_id,
              parentId: event.data.node_id
            }
          });
          break;
        case event.ActionType.Delete:
          action = this.sitemapService.deleteUserSiteMap(event.data.node_id).pipe(
            map(_ => 'Deleted')
          );
          break;
      }

      if (action) {
        action.pipe(tap(res => res ? this.swichMode(EditModeType.Node) : null)).subscribe();
      }
    }
  }

  private registerSubjects() {
    this.nodeSelected$.pipe(
      takeUntil(this.destroy$),
      throttleTime(750),
      // switchMap(selectedNode => {
      //   console.warn('selectedNode = ', selectedNode);
      //   return (
      //     selectedNode
      //       ? this.sitemapService.getUserSiteMapNodeByNodeId(this.selectedSite.site_id, selectedNode.node_id).pipe(
      //         catchError(err => {
      //           alert(`取得節點錯誤 : ${selectedNode.node_name}`);
      //           return throwError(`取得節點錯誤 : ${selectedNode.node_name}`);
      //         })
      //       )
      //       : of(undefined)
      //   ).pipe(
      //     tap(selectedSitemapNode => {
      //       const parent = this.sitemapTree.findParent(selectedNode);
      //       const order = (parent?.children || []).indexOf(selectedNode);
      //       this.selectedNode = {
      //         siteMap: selectedSitemapNode,
      //         parentId: parent?.node_id,
      //         nodeOrder: order > -1 ? `${order}` : '',
      //       };
      //     })
      //   );
      // }),
    ).subscribe(selectedNode => {
      if (selectedNode) {
        this.sitemapService.getUserSiteMapNodeByNodeId(this.selectedSite.site_id, selectedNode.node_id).pipe(
          catchError(err => {
            alert(`取得節點錯誤 : ${selectedNode.node_name}`);
            return throwError(`取得節點錯誤 : ${selectedNode.node_name}`);
          })
        ).subscribe(selectedSitemapNode => {
          const parent = this.sitemapTree.findParent(selectedNode);
          const order = (parent?.children || []).indexOf(selectedNode);
          this.selectedNode = {
            siteMap: selectedSitemapNode,
            parentId: parent?.node_id,
            nodeOrder: order > -1 ? `${order}` : '',
          };
        });
      }
    });
  }

  onNodeUpdate(reset = false) {
    console.warn('this.selectedNode = ', this.selectedNode);
    if (reset) {
      this.swichMode(EditModeType.Node);
    } else {
      const selectedNode = this.selectedNode.siteMap as any;
      this.nodeSelected$.next(selectedNode);
    }
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
    this.modalService.openConfirm({ message: '確定移動節點?' }).subscribe(confirm => {
      if (!confirm) { return; }
      of(undefined).pipe(
        concatMap(_ => this.sitemapService.getUserSiteMapNodeByNodeId(this.selectedSite.site_id, target.node_id)),
        concatMap(nodeToUpdate => {
          return this.sitemapService.updateSiteNode(
            nodeToUpdate.node_id,
            nodeToUpdate.node_name,
            '0',
            nodeToUpdate.meta_title,
            {
              parentId: to.node_id,
              contentPath: nodeToUpdate.content_path,
              urlType: nodeToUpdate.url_type,
              urlLinkNodeId: nodeToUpdate.url_link_node_id,
              url: nodeToUpdate.url,
              urlBlank: nodeToUpdate.url_blank,
              metaDescription: nodeToUpdate.meta_description,
              metaKeyword: nodeToUpdate.meta_keyword,
              metaImage: nodeToUpdate.meta_image,
            }
          );
        }),
      ).subscribe(_ => {
        this.onNodeUpdate(true);
      });
    });
  }

}
