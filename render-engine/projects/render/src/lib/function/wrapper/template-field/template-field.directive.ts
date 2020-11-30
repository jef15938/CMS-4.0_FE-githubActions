import { HostListener, Output, EventEmitter, Injector, Directive } from '@angular/core';
import { TemplateFieldSelectEvent, TemplateWrapperSelectedTargetType } from './../template-wrapper/template-wrapper.interface';
import { TemplateWrapperBase } from './../template-wrapper/template-wrapper-base';
import { ContentFieldInfoModel } from '../../../global/api/data-model/models/content-field-info.model';

@Directive()
export abstract class TemplateFieldDirective extends TemplateWrapperBase {

  abstract fieldInfo: ContentFieldInfoModel;
  // tslint:disable-next-line: no-output-native
  @Output() select = new EventEmitter<TemplateFieldSelectEvent>();

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }

  @HostListener('click', ['$event']) click(ev) {
    if (this.renderPageState?.isEditor) {
      this.select.emit({
        selectedTarget: this.elementRef?.nativeElement,
        selectedTargetType: TemplateWrapperSelectedTargetType.FIELD,
        fieldInfo: this.fieldInfo,
        fieldDirective: this,
      });
    }
  }

}
