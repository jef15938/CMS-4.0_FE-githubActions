import { Directive, Input, Injector } from '@angular/core';
import { TemplateFieldDirective } from './template-field.directive';
import { ContentFieldInfoModel } from '../../../../global/api/data-model/models/content-field-info.model';

@Directive({
  selector: '[libLayoutFieldHtmlEditor]',
  exportAs: 'field',
})
export class LayoutFieldHtmlEditorDirective extends TemplateFieldDirective {
  @Input('libLayoutFieldHtmlEditor') fieldInfo: ContentFieldInfoModel;

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }
}
