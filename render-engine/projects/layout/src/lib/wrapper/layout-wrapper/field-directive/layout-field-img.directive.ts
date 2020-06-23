import { Directive, Input, Injector } from '@angular/core';
import { TemplateFieldDirective } from './template-field.directive';
import { FieldInfo } from '../../../interface/field-info.interface';

export interface ImgFieldInfo extends FieldInfo {
  extension: {
    altValue: string;
  };
}

@Directive({
  selector: '[libLayoutFieldImg][adviceWidth][adviceHeight][adviceFormat]',
  exportAs: 'field',
})
export class LayoutFieldImgDirective extends TemplateFieldDirective {
  // tslint:disable-next-line: no-input-rename
  @Input('libLayoutFieldImg') fieldInfo: ImgFieldInfo;
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
