import { Directive, Input, Injector } from '@angular/core';
import { TemplateFieldDirective } from './template-field.directive';
import { FieldInfo } from '../../../../global/interface/field-info.interface';

@Directive({
  selector: '[libLayoutFieldText][maxLength]',
  exportAs: 'field',
})
export class LayoutFieldTextDirective extends TemplateFieldDirective {
  // tslint:disable-next-line: no-input-rename
  @Input('libLayoutFieldText') fieldInfo: FieldInfo;
  /**
   * 長度限制，0無限制
   */
  // tslint:disable-next-line: no-input-rename
  @Input('maxLength') maxLength = 0;

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }
}
