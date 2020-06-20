import { Directive, Input } from '@angular/core';
import { TemplateFieldDirective } from './template-field.directive';
import { FieldInfo } from '../../../interface/field-info.interface';

@Directive({
  selector: '[libLayoutFieldTextarea][maxLength][maxLines]',
  exportAs: 'field',
})
export class LayoutFieldTextareaDirective extends TemplateFieldDirective {
  // tslint:disable-next-line: no-input-rename
  @Input('libLayoutFieldTextarea') fieldInfo: FieldInfo;
  /**
   * 長度限制，0無限制
   */
  // tslint:disable-next-line: no-input-rename
  @Input('maxLength') maxLength = 0;
  /**
   * 行數限制，0無限制
   */
  // tslint:disable-next-line: no-input-rename
  @Input('maxLines') maxLines = 0;
}
