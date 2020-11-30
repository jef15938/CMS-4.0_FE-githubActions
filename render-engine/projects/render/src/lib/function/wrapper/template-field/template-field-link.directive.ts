import { Directive, Input, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TemplateFieldDirective } from './template-field.directive';
import { ContentFieldInfoModel } from '../../../global/api/data-model/models/content-field-info.model';
import { SitemapUtil } from '../../../global/utils/sitemap-util';
import { customAction } from '../../../global/const/custom-action-subject';

export enum LinkFieldInfoUrlType {
  INSIDE = 'INSIDE',
  OUTSITE = 'OUTSITE',
}

export interface LinkFieldInfo extends ContentFieldInfoModel {
  extension: {
    isTargetBlank: 'true' | 'false';
    urlType: LinkFieldInfoUrlType;
    siteId: string;
    actionID: string;
  };
}

@Directive({
  selector: '[libTemplateFieldLink]',
  exportAs: 'field',
})
export class TemplateFieldLinkDirective extends TemplateFieldDirective implements OnInit {
  @Input('libTemplateFieldLink') fieldInfo: LinkFieldInfo;

  customAction$ = customAction;
  constructor(
    injector: Injector,
    private router: Router,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.renderPageState$.subscribe(state => {
      console.warn('LinkFieldInfo state = ', state);
      this.renderView();
    });
  }

  private renderView() {
    if (this.renderPageState.isRuntime) {
      const el = this.elementRef.nativeElement as HTMLElement;
      const aTag = (el?.tagName?.toLowerCase() === 'a' ? el : el.querySelector('a')) as HTMLAnchorElement;
      if (!aTag) { return; }

      const isInside = this.fieldInfo.extension.urlType === 'INSIDE';
      if (!isInside) { return; }

      const isHrefSet = !!aTag.getAttribute('nodeId');
      if (!isHrefSet) {
        const siteId = this.fieldInfo.extension.siteId;
        const nodeId = aTag.getAttribute('href');
        const sites = this.renderPageState.sitemap.sites;
        const href = SitemapUtil.findContentPathBySiteIdAndNodeId(sites, siteId, nodeId);
        if (href) {
          aTag.setAttribute('nodeId', nodeId);
          const paths = this.router.url.split('/').filter(v => !!v);
          paths[paths.length - 1] = href;
          aTag.setAttribute('href', `/${paths.join('/')}`);
        }
      }
    }
  }

  private preventOriginClickEvent(ev) {
    ev.preventDefault(); // 避免真的開連結，但也會讓 Base 的 TemplateFieldDirective.click() 收不到 event
    ev.stopPropagation(); // 會讓 Base 的 TemplateFieldDirective.click() 收不到 event
  }

  click(ev) {
    super.click(ev);
    const isEditor = this.renderPageState?.isEditor;

    const actionId = this.fieldInfo.extension.actionID;

    if (actionId) {
      this.preventOriginClickEvent(ev);
      if (!isEditor) {
        this.customAction$.next(actionId);
      }
      return;
    }

    const isInside = this.fieldInfo.extension.urlType === 'INSIDE';
    const isPreview = this.renderPageState.isPreview;

    if (isPreview && isInside) {
      this.preventOriginClickEvent(ev);
      return;
    }

  }
}
