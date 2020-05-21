import { Directive, Input } from '@angular/core';
import { TemplateFieldDirective } from './template-field.directive';
import { FieldInfo } from '../../../interface/field-info.interface';

export interface LinkFieldInfo extends FieldInfo {
  extension: {
    isTargetBlank: 'true' | 'false';
  }
}

@Directive({
  selector: '[libLayoutFieldLink]',
  exportAs: 'field',
})
export class LayoutFieldLinkDirective extends TemplateFieldDirective {
  @Input('libLayoutFieldLink') fieldInfo: LinkFieldInfo;
}
