import { Directive, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { FieldInfo, FieldType } from '../../interface/field-info.interface';
import { TemplateFieldSelectEvent, LayoutWrapperSelectedTargetType } from './layout-wrapper.interface';
import { LayoutWrapperBase } from './layout-wrapper-base';

@Directive({
  selector: '[libTemplateField]'
})
export class TemplateFieldDirective extends LayoutWrapperBase {

  @Input('libTemplateField') fieldInfo: FieldInfo;
  @Output() select = new EventEmitter<TemplateFieldSelectEvent>();

  ngAfterViewInit() {
    (this.elementRef.nativeElement as HTMLElement).setAttribute('info', this._getInfo());
  }

  private _getInfo(): string {
    let type = '';
    switch (this.fieldInfo.fieldType) {
      case FieldType.TEXT:
        type = '短文字';
        break;
      case FieldType.TEXTEREA:
        type = '長文';
        break;
      case FieldType.LINK:
        type = '連結';
        break;
      case FieldType.BGIMG:
        type = '背景圖片';
        break;
      case FieldType.IMG:
        type = '圖片';
        break;
      case FieldType.GROUP:
        type = '群組';
        break;
      case FieldType.HTMLEDITOR:
        type = 'HTML';
        break;
    }
    return `${type} : ${this.fieldInfo.fieldId}`;
  }

  @HostListener('click') click() {
    if (this.mode === 'edit') {
      this.select.emit({
        selectedTarget: this.elementRef?.nativeElement,
        selectedTargetType: LayoutWrapperSelectedTargetType.FIELD,
        fieldInfo: this.fieldInfo,
      });
    }
  }

}
