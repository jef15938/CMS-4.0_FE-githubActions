import { Directive, Input, HostListener, ElementRef, Output, EventEmitter, HostBinding } from '@angular/core';
import { FieldInfo } from '../../interface/field-info.interface';
import { TemplateFieldSelectEvent, LayoutWrapperSelectedTargetType } from './layout-wrapper.interface';
import { LayoutWrapperBase } from './layout-wrapper-base';

@Directive({
  selector: '[libTemplateField]'
})
export class TemplateFieldDirective extends LayoutWrapperBase {

  @Input('libTemplateField') fieldInfo: FieldInfo;
  @Output() select = new EventEmitter<TemplateFieldSelectEvent>();

  constructor(
    public elementRef: ElementRef,
  ) { super(); }

  @HostListener('click') click() {
    if (this.getMode() === 'edit') {
      this.select.emit({
        selectedTarget: this.elementRef?.nativeElement,
        selectedTargetType: LayoutWrapperSelectedTargetType.FIELD,
        fieldInfo: this.fieldInfo,
      });
    }
  }

}
