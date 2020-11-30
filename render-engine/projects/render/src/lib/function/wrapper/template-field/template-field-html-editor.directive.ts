import { Directive, Input, Injector } from '@angular/core';
import { TemplateFieldDirective } from './template-field.directive';
import { ContentFieldInfoModel } from '../../../global/api/data-model/models/content-field-info.model';

@Directive({
  selector: '[libTemplateFieldHtmlEditor]',
  exportAs: 'field',
})
export class TemplateFieldHtmlEditorDirective extends TemplateFieldDirective {
  @Input('libTemplateFieldHtmlEditor') fieldInfo: ContentFieldInfoModel;

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }
}
