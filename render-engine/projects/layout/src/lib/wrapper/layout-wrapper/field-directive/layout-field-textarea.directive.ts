import { Directive, Input } from '@angular/core';
import { TemplateFieldDirective } from './template-field.directive';
import { FieldInfo } from '../../../interface/field-info.interface';

@Directive({
  selector: '[libLayoutFieldTextarea][maxLength][maxLines]'
})
export class LayoutFieldTextareaDirective extends TemplateFieldDirective {
  @Input('libLayoutFieldTextarea') fieldInfo: FieldInfo;
  /**
     * 長度限制，-1無限制
     *
     * @memberof LayoutFieldTextareaDirective
     */
  @Input('maxLength') maxLength = -1;
  /**
     * 行數限制，-1無限制
     *
     * @memberof LayoutFieldTextareaDirective
     */
  @Input('maxLines') maxLines = -1;
}
