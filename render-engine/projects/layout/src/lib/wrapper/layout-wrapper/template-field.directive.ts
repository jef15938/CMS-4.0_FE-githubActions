import { Directive, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { FieldInfo } from '../../interface/field-info.interface';
import { TemplateFieldSelectEvent, LayoutWrapperSelectedTargetType } from './layout-wrapper.interface';
import { LayoutWrapperBase } from './layout-wrapper-base';

@Directive({
  selector: '[libTemplateField]'
})
export class TemplateFieldDirective extends LayoutWrapperBase {

  @Input('libTemplateField') fieldInfo: FieldInfo;
  @Output() select = new EventEmitter<TemplateFieldSelectEvent>();

  @HostListener('click') click() {
    if (this.mode === 'edit') {
      this.select.emit({
        selectedTarget: this._elementRef?.nativeElement,
        selectedTargetType: LayoutWrapperSelectedTargetType.FIELD,
        fieldInfo: this.fieldInfo,
      });
    }
  }

}
