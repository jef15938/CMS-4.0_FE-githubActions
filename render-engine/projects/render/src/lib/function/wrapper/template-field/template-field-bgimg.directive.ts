import { Directive, Input, Injector } from '@angular/core';
import { TemplateFieldDirective } from './template-field.directive';
import { ContentFieldInfoModel } from '../../../global/api/data-model/models/content-field-info.model';

@Directive({
  selector: '[libTemplateFieldBgimg][adviceWidth][adviceHeight][adviceFormat]',
  exportAs: 'field',
})
export class TemplateFieldBgimgDirective extends TemplateFieldDirective {
  // tslint:disable-next-line: no-input-rename
  @Input('libTemplateFieldBgimg') fieldInfo: ContentFieldInfoModel;
  /**
   * 建議寬度
   */
  // tslint:disable-next-line: no-input-rename
  @Input('adviceWidth') adviceWidth = 120;
  /**
   * 建議高度
   */
  // tslint:disable-next-line: no-input-rename
  @Input('adviceHeight') adviceHeight = 120;
  /**
   * 建議格式
   */
  // tslint:disable-next-line: no-input-rename
  @Input('adviceFormat') adviceFormat = 'png';

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }
}
