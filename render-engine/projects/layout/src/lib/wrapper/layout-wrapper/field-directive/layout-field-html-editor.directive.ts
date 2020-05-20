import { Directive, Input } from '@angular/core';
import { TemplateFieldDirective } from './template-field.directive';
import { FieldInfo } from '../../../interface/field-info.interface';

@Directive({
  selector: '[libLayoutFieldHtmlEditor]'
})
export class LayoutFieldHtmlEditorDirective extends TemplateFieldDirective {
  @Input('libLayoutFieldHtmlEditor') fieldInfo: FieldInfo;
}
