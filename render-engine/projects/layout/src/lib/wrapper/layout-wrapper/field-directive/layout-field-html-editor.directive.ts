import { Directive, Input, Injector } from '@angular/core';
import { TemplateFieldDirective } from './template-field.directive';
import { FieldInfo } from '../../../interface/field-info.interface';

@Directive({
  selector: '[libLayoutFieldHtmlEditor]',
  exportAs: 'field',
})
export class LayoutFieldHtmlEditorDirective extends TemplateFieldDirective {
  @Input('libLayoutFieldHtmlEditor') fieldInfo: FieldInfo;

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }
}
