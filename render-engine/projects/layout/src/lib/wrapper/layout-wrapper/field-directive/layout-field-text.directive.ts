import { Directive, Input } from '@angular/core';
import { TemplateFieldDirective } from './template-field.directive';
import { FieldInfo } from '../../../interface/field-info.interface';

@Directive({
  selector: '[libLayoutFieldText][maxLength]'
})
export class LayoutFieldTextDirective extends TemplateFieldDirective {
  @Input('libLayoutFieldText') fieldInfo: FieldInfo;
  /**
   * 長度限制，0無限制
   *
   * @memberof LayoutFieldTextDirective
   */
  @Input('maxLength') maxLength = 0;
}
