import { Directive, Input, Injector, AfterContentChecked } from '@angular/core';
import { TemplateFieldDirective } from './template-field.directive';
import { ContentFieldInfoModel } from '../../../../global/api/data-model/models/content-field-info.model';
import { SiteMapGetResponseModel } from '../../../../global/api/data-model/models/site-map-get-response.model';

export enum LinkFieldInfoUrlType {
  INSIDE = 'INSIDE',
  OUTSITE = 'OUTSITE',
}

export interface LinkFieldInfo extends ContentFieldInfoModel {
  extension: {
    isTargetBlank: 'true' | 'false';
    urlType: LinkFieldInfoUrlType;
    siteId: '';
  };
}

@Directive({
  selector: '[libLayoutFieldLink]',
  exportAs: 'field',
})
export class LayoutFieldLinkDirective extends TemplateFieldDirective implements AfterContentChecked {
  @Input('libLayoutFieldLink') fieldInfo: LinkFieldInfo;

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }

  ngAfterContentChecked(): void {
    if (this.runtime) {
      const el = this.elementRef.nativeElement as HTMLElement;
      const aTag = (el?.tagName?.toLowerCase() === 'a' ? el : el.querySelector('a')) as HTMLAnchorElement;
      if (!aTag) { return; }

      const isInside = aTag.getAttribute('urltype') === 'INSIDE';
      if (!isInside) { return; }

      const isHrefSet = !!aTag.getAttribute('nodeId');
      if (!isHrefSet) {
        const siteId = aTag.getAttribute('siteid');
        const nodeId = aTag.getAttribute('href');
        const href = SiteMapGetResponseModel.findContentPathBySiteIdAndNodeId(this.sites, siteId, nodeId);
        if (href) {
          aTag.setAttribute('nodeId', nodeId);
          aTag.setAttribute('href', href);
        }
      }
    }
  }

  click(ev) {
    if (this.mode === 'edit' || !this.runtime) {
      ev.preventDefault(); // 避免真的開連結，但也會讓 Base 的 TemplateFieldDirective.click() 收不到 event
      super.click(ev);
      // ev.stopPropagation(); // 會讓 Base 的 TemplateFieldDirective.click() 收不到 event
    }
  }
}
