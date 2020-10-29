import { Directive, Input, Injector, OnChanges, SimpleChanges, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TemplateFieldDirective } from './template-field.directive';
import { ContentFieldInfoModel } from '../../../../global/api/data-model/models/content-field-info.model';
import { SitemapUtil } from '../../../../global/utils/sitemap-util';
import { RenderedPageEnvironment } from '../../../../global/interface/page-environment.interface';
import { RENDERED_PAGE_ENVIRONMENT_ROKEN } from '../../../../global/injection-token/injection-token';
import { customAction } from '../../../../global/const/custom-action-subject';

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
  selector: '[libLayoutFieldLink]',
  exportAs: 'field',
})
export class LayoutFieldLinkDirective extends TemplateFieldDirective implements OnChanges {
  @Input('libLayoutFieldLink') fieldInfo: LinkFieldInfo;

  customAction$ = customAction;
  constructor(
    injector: Injector,
    private router: Router,
    @Inject(RENDERED_PAGE_ENVIRONMENT_ROKEN) private pageEnv: RenderedPageEnvironment,
  ) {
    super(injector);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.pageEnv.isRuntime) {
      const el = this.elementRef.nativeElement as HTMLElement;
      const aTag = (el?.tagName?.toLowerCase() === 'a' ? el : el.querySelector('a')) as HTMLAnchorElement;
      if (!aTag) { return; }

      const isInside = this.fieldInfo.extension.urlType === 'INSIDE';
      if (!isInside) { return; }

      const isHrefSet = !!aTag.getAttribute('nodeId');
      if (!isHrefSet) {
        const siteId = this.fieldInfo.extension.siteId;
        const nodeId = aTag.getAttribute('href');
        const sites = this.sites;
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
    const isEditor = this.mode === 'edit';

    const actionId = this.fieldInfo.extension.actionID;

    if (actionId) {
      this.preventOriginClickEvent(ev);
      if (!isEditor) {
        this.customAction$.next(actionId);
      }
      return;
    }

    const isInside = this.fieldInfo.extension.urlType === 'INSIDE';
    const isPreview = !this.pageEnv.isRuntime;

    if (isPreview && isInside) {
      this.preventOriginClickEvent(ev);
      return;
    }

  }
}
