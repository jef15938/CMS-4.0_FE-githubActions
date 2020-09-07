import { Directive, Input, Injector } from '@angular/core';
import { TemplateFieldDirective } from './template-field.directive';
import { ContentFieldInfoModel } from '../../../../global/api/data-model/models/content-field-info.model';

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
export class LayoutFieldLinkDirective extends TemplateFieldDirective {
  @Input('libLayoutFieldLink') fieldInfo: LinkFieldInfo;

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }

  click(ev) {
    if (this.mode === 'edit' || !this.runtime) {
      ev.preventDefault(); // 避免真的開連結，但也會讓 Base 的 TemplateFieldDirective.click() 收不到 event
      super.click(ev);
      // ev.stopPropagation(); // 會讓 Base 的 TemplateFieldDirective.click() 收不到 event
    }
  }
}
