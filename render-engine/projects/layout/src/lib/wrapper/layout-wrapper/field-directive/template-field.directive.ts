import { HostListener, Output, EventEmitter, Injector } from '@angular/core';
import { FieldInfo } from '../../../interface/field-info.interface';
import { TemplateFieldSelectEvent, LayoutWrapperSelectedTargetType } from '../layout-wrapper.interface';
import { LayoutWrapperBase } from '../layout-wrapper-base';

export abstract class TemplateFieldDirective extends LayoutWrapperBase {

  abstract fieldInfo: FieldInfo;
  // tslint:disable-next-line: no-output-native
  @Output() select = new EventEmitter<TemplateFieldSelectEvent>();

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }

  @HostListener('click', ['$event']) click(ev) {
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
