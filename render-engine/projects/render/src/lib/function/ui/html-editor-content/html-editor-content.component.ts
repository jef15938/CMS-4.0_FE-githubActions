import { Component, Input, OnChanges, SimpleChanges, Inject, ViewChild, AfterViewInit, ViewContainerRef, ApplicationRef, ComponentFactoryResolver, Injector, OnDestroy, ComponentRef } from '@angular/core';
import { Router } from '@angular/router';
import { SitemapUtil } from '../../../global/utils/sitemap-util';
import { SiteInfoModel } from '../../../global/api/data-model/models/site-info.model';
import { RenderedPageEnvironment } from '../../../global/interface/page-environment.interface';
import { RENDERED_PAGE_ENVIRONMENT_ROKEN } from '../../../global/injection-token/injection-token';
import { fromEvent, Subject } from 'rxjs';
import { customAction } from '../../../global/const/custom-action-subject';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { HtmlTableContentComponent } from '../html-table-content/html-table-content.component';

@Component({
  selector: 'rdr-html-editor-content',
  templateUrl: './html-editor-content.component.html',
  styleUrls: ['./html-editor-content.component.scss']
})
export class HtmlEditorContentComponent implements OnChanges, AfterViewInit, OnDestroy {

  @ViewChild('Container', { read: ViewContainerRef }) container: ViewContainerRef;

  @Input() mode: 'preview' | 'edit';
  @Input() htmlString;
  @Input() sites: SiteInfoModel[] = [];

  private componentRefs: ComponentRef<any>[] = [];

  private customAction$ = customAction;
  private render$ = new Subject();
  private destroy$ = new Subject();

  constructor(
    private router: Router,
    @Inject(RENDERED_PAGE_ENVIRONMENT_ROKEN) private pageEnv: RenderedPageEnvironment,
    private injector: Injector,
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.render$.next();
  }

  ngAfterViewInit(): void {
    this.render$.pipe(
      debounceTime(100),
      takeUntil(this.destroy$),
    ).subscribe(_ => this.renderView(this.htmlString));

    fromEvent(this.container.element.nativeElement, 'click', { capture: true }).pipe(
      takeUntil(this.destroy$),
    ).subscribe((ev: MouseEvent) => this.emitCustomAction(ev));

    this.render$.next();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  private emitCustomAction(ev: MouseEvent) {
    const target = ev.target as HTMLElement;
    if (target.tagName?.toLowerCase() === 'a') {
      const actionId = target.getAttribute('actionid');
      if (actionId && this.mode === 'preview') {
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
      if (this.pageEnv.isRuntime) {
        const isHrefSet = !!node.getAttribute('nodeId');
        if (!isHrefSet) {
          const siteId = node.getAttribute('siteid');
          const nodeId = node.getAttribute('href');
          const sites = this.sites;
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
