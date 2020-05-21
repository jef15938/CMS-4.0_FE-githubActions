import { Directive, Input } from '@angular/core';
import { TemplateFieldDirective } from './template-field.directive';
import { FieldInfo } from '../../../interface/field-info.interface';

@Directive({
  selector: '[libLayoutFieldBgimg][adviceWidth][adviceHeight][adviceFormat]',
  exportAs: 'field',
})
export class LayoutFieldBgimgDirective extends TemplateFieldDirective {
  @Input('libLayoutFieldBgimg') fieldInfo: FieldInfo;
  /**
   * 建議寬度
   *
   * @memberof LayoutFieldBgimgDirective
   */
  @Input('adviceWidth') adviceWidth = 120;
  /**
   * 建議高度
   *
   * @memberof LayoutFieldBgimgDirective
   */
  @Input('adviceHeight') adviceHeight = 120;
  /**
   * 建議格式
   *
   * @memberof LayoutFieldBgimgDirective
   */
  @Input('adviceFormat') adviceFormat = 'png';
}
