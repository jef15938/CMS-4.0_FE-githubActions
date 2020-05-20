import { HostListener, Output, EventEmitter } from '@angular/core';
import { FieldInfo } from '../../../interface/field-info.interface';
import { TemplateFieldSelectEvent, LayoutWrapperSelectedTargetType } from '../layout-wrapper.interface';
import { LayoutWrapperBase } from '../layout-wrapper-base';

export abstract class TemplateFieldDirective extends LayoutWrapperBase {

  abstract fieldInfo: FieldInfo;
  @Output() select = new EventEmitter<TemplateFieldSelectEvent>();

  @HostListener('click') click() {
    if (this.mode === 'edit') {
      this.select.emit({
        selectedTarget: this.elementRef?.nativeElement,
        selectedTargetType: LayoutWrapperSelectedTargetType.FIELD,
        fieldInfo: this.fieldInfo,
        fieldDirective: this,
      });
    }
  }

}
