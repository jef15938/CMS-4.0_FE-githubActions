import { Directive, Input, Injector } from '@angular/core';
import { TemplateFieldDirective } from './template-field.directive';
import { ContentFieldInfoModel } from '../../../global/api/data-model/models/content-field-info.model';

@Directive({
  selector: '[libTemplateFieldText][maxLength]',
  exportAs: 'field',
})
export class TemplateFieldTextDirective extends TemplateFieldDirective {
  // tslint:disable-next-line: no-input-rename
  @Input('libTemplateFieldText') fieldInfo: ContentFieldInfoModel;
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
