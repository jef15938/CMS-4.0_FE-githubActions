import { HostListener, Output, EventEmitter, Injector, Directive } from '@angular/core';
import { TemplateFieldSelectEvent, LayoutWrapperSelectedTargetType } from '../layout-wrapper.interface';
import { LayoutWrapperBase } from '../layout-wrapper-base';
import { ContentFieldInfoModel } from '../../../../global/api/data-model/models/content-field-info.model';

@Directive()
export abstract class TemplateFieldDirective extends LayoutWrapperBase {

  abstract fieldInfo: ContentFieldInfoModel;
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
