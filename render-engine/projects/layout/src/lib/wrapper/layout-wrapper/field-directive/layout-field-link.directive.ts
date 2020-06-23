import { Directive, Input, Injector } from '@angular/core';
import { TemplateFieldDirective } from './template-field.directive';
import { FieldInfo } from '../../../interface/field-info.interface';

export interface LinkFieldInfo extends FieldInfo {
  extension: {
    isTargetBlank: 'true' | 'false';
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
    if (this.mode === 'edit') {
      ev.preventDefault(); // 避免真的開連結，但也會讓 Base 的 TemplateFieldDirective.click() 收不到 event
      super.click(ev);
      // ev.stopPropagation(); // 會讓 Base 的 TemplateFieldDirective.click() 收不到 event
    }
  }
}
