import { Directive, Input } from '@angular/core';
import { TemplateFieldDirective } from './template-field.directive';
import { FieldInfo } from '../../../interface/field-info.interface';

@Directive({
  selector: '[libLayoutFieldLink]'
})
export class LayoutFieldLinkDirective extends TemplateFieldDirective {
  @Input('libLayoutFieldLink') fieldInfo: FieldInfo;
}
