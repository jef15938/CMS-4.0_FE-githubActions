import { Directive, Input } from '@angular/core';
import { TemplateFieldDirective } from './template-field.directive';
import { FieldInfo } from '../../../interface/field-info.interface';

@Directive({
  selector: '[libLayoutFieldImg][adviceWidth][adviceHeight][adviceFormat]',
  exportAs: 'field',
})
export class LayoutFieldImgDirective extends TemplateFieldDirective {
  @Input('libLayoutFieldImg') fieldInfo: FieldInfo;
  /**
   * 建議寬度
   *
   * @memberof LayoutFieldImgDirective
   */
  @Input('adviceWidth') adviceWidth = 120;
  /**
   * 建議高度
   *
   * @memberof LayoutFieldImgDirective
   */
  @Input('adviceHeight') adviceHeight = 120;
  /**
   * 建議格式
   *
   * @memberof LayoutFieldImgDirective
   */
  @Input('adviceFormat') adviceFormat = 'png';
}
