import { Component, Input, ViewChild, AfterViewInit, ViewContainerRef, ApplicationRef, ComponentFactoryResolver, Injector, OnDestroy, ComponentRef } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { SitemapUtil } from '../../../global/utils/sitemap-util';
import { customAction } from '../../../global/const/custom-action-subject';
import { HtmlTableContentComponent } from '../html-table-content/html-table-content.component';
import { RenderPageStore, RenderPageState } from '../../../global/component-store/render-page.store';

@Component({
  selector: 'rdr-html-editor-content',
  templateUrl: './html-editor-content.component.html',
  styleUrls: ['./html-editor-content.component.scss']
})
export class HtmlEditorContentComponent implements AfterViewInit, OnDestroy {

  @ViewChild('Container', { read: ViewContainerRef }) container: ViewContainerRef;

  @Input() htmlString;

  private componentRefs: ComponentRef<any>[] = [];

  private customAction$ = customAction;
  private destroy$ = new Subject();

  private renderPageState: RenderPageState;

  constructor(
    private router: Router,
    private injector: Injector,
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private readonly renderPageStore: RenderPageStore,
  ) { }

  ngAfterViewInit(): void {
    fromEvent(this.container.element.nativeElement, 'click', { capture: true }).pipe(
      takeUntil(this.destroy$),
    ).subscribe((ev: MouseEvent) => this.emitCustomAction(ev));

    this.renderPageStore.state$.pipe(
      takeUntil(this.destroy$),
      tap(state => this.renderPageState = state),
    ).subscribe(state => {
      this.renderView(this.htmlString);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  private emitCustomAction(ev: MouseEvent) {
    const target = ev.target as HTMLElement;
    if (target.tagName?.toLowerCase() === 'a') {
      const actionId = target.getAttribute('actionid');
      if (actionId && this.renderPageState.isPreview) {
        this.preventOriginClickEvent(ev);
        this.customAction$.next(actionId);
      }
    }
  }

  private preventOriginClickEvent(ev) {
    ev.preventDefault(); // 避免真的開連結，但也會讓 Base 的 TemplateFieldDirective.click() 收不到 event
    ev.stopPropagation(); // 會讓 Base 的 TemplateFieldDirective.click() 收不到 event
  }

  private renderView(htmlString: string) {
    htmlString = htmlString || '<p>無內容</p>';
    this.componentRefs.forEach(cRef => {
      this.applicationRef.detachView(cRef.hostView);
    });
    this.componentRefs.length = 0;
    this.container.clear();
    this.container.element.nativeElement.innerHTML = '';

    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = htmlString;

    const actions = Array.from(tempContainer.querySelectorAll('a[actionid]')).filter(node => !!node.getAttribute('actionid'));
    actions.forEach(node => {
      node.removeAttribute('target');
      node.removeAttribute('href');
      node.setAttribute('href', 'javascript: void(0)');
    });

    const insides = tempContainer.querySelectorAll('a[urltype="INSIDE"]');
    insides.forEach(node => {
      // 根據 nodeId 找到 contentPath
      if (this.renderPageState.isRuntime) {
        const isHrefSet = !!node.getAttribute('nodeId');
        if (!isHrefSet) {
          const siteId = node.getAttribute('siteid');
          const nodeId = node.getAttribute('href');
          const sites = this.renderPageState.sitemap.sites;
          const href = SitemapUtil.findContentPathBySiteIdAndNodeId(sites, siteId, nodeId);
          if (href) {
            node.setAttribute('nodeId', nodeId);
            const paths = this.router.url.split('/').filter(v => !!v);
            paths[paths.length - 1] = href;
            node.setAttribute('href', `/${paths.join('/')}`);
          }
        }
      } else {
        node.removeAttribute('target');
        node.removeAttribute('href');
        node.setAttribute('href', 'javascript: void(0)');
      }
    });

    const tableWraps = Array.from(tempContainer.querySelectorAll('div.neux-table-wrap')) as HTMLDivElement[];
    tableWraps.forEach(wrap => {
      const table = wrap.querySelector('table');
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(HtmlTableContentComponent);
      const componentRef = componentFactory.create(this.injector, [], wrap);
      this.componentRefs.push(componentRef);
      const instance = componentRef.instance;
      instance.table = table;
    });

    const childNodes = Array.from(tempContainer.childNodes);
    const fragment = document.createDocumentFragment();
    childNodes.forEach(childNode => {
      fragment.appendChild(childNode);
    });

    this.container.element.nativeElement.appendChild(fragment);

    this.componentRefs.forEach(cRef => {
      this.applicationRef.attachView(cRef.hostView);
    });
  }

}
