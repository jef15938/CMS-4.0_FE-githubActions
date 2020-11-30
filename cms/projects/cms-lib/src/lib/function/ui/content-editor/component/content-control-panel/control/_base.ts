import { Input, Output, EventEmitter, Directive } from '@angular/core';
import { TemplateWrapperSelectEvent } from '@neux/render';

@Directive()
export abstract class ContentControlBase {
  @Input() selected: TemplateWrapperSelectEvent;

  // tslint:disable-next-line: no-output-native
  @Output() change = new EventEmitter();
}
