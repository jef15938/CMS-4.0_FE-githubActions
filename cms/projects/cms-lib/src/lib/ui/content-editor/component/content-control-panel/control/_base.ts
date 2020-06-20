import { Input, Output, EventEmitter } from '@angular/core';
import { LayoutWrapperSelectEvent } from 'layout';

export abstract class ContentControlBase {
  @Input() selected: LayoutWrapperSelectEvent;
  // tslint:disable-next-line: no-output-native
  @Output() change = new EventEmitter();
}
