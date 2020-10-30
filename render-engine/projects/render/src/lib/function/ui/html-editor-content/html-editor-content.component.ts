import { Component, Input, OnChanges, SimpleChanges, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { SitemapUtil } from '../../../global/utils/sitemap-util';
import { SiteInfoModel } from '../../../global/api/data-model/models/site-info.model';
import { RenderedPageEnvironment } from '../../../global/interface/page-environment.interface';
import { RENDERED_PAGE_ENVIRONMENT_ROKEN } from '../../../global/injection-token/injection-token';
import { fromEvent } from 'rxjs';
import { customAction } from '../../../global/const/custom-action-subject';


@Component({
  selector: 'rdr-html-editor-content',
  templateUrl: './html-editor-content.component.html',
  styleUrls: ['./html-editor-content.component.scss']
})
export class HtmlEditorContentComponent implements OnChanges, AfterViewInit {

  @ViewChild('Container') container: ElementRef<HTMLDivElement>;

  @Input() mode: 'preview' | 'edit';
  @Input() htmlString;
  @Input() sites: SiteInfoModel[] = [];

  html: string;
  customAction$ = customAction;

  constructor(
    private router: Router,
    @Inject(RENDERED_PAGE_ENVIRONMENT_ROKEN) private pageEnv: RenderedPageEnvironment,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    const div = document.createElement('div');
    div.innerHTML = this.htmlString;

    const actions = Array.from(div.querySelectorAll('a[actionid]')).filter(node => !!node.getAttribute('actionid'));
    actions.forEach(node => {
      node.removeAttribute('target');
      node.removeAttribute('href');
      node.setAttribute('href', 'javascript: void(0)');
    });

    const insides = div.querySelectorAll('a[urltype="INSIDE"]');
    insides.forEach(node => {
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

    this.html = div.innerHTML;
  }

  ngAfterViewInit(): void {
    fromEvent(this.container.nativeElement, 'click', { capture: true }).subscribe(ev => {
      const target = ev.target as HTMLElement;
      if (target.tagName?.toLowerCase() === 'a') {
        const actionId = target.getAttribute('actionid');
        if (actionId && this.mode === 'preview') {
          this.preventOriginClickEvent(ev);
          this.customAction$.next(actionId);
        }
      }
    });
  }

  private preventOriginClickEvent(ev) {
    ev.preventDefault(); // 避免真的開連結，但也會讓 Base 的 TemplateFieldDirective.click() 收不到 event
    ev.stopPropagation(); // 會讓 Base 的 TemplateFieldDirective.click() 收不到 event
  }

}
