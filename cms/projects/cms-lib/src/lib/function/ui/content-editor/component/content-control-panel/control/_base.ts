import { Input, Output, EventEmitter, Directive } from '@angular/core';
import { LayoutWrapperSelectEvent } from 'render';

@Directive()
export abstract class ContentControlBase {
  @Input() selected: LayoutWrapperSelectEvent;
  // tslint:disable-next-line: no-output-native
  @Output() change = new EventEmitter();
}
