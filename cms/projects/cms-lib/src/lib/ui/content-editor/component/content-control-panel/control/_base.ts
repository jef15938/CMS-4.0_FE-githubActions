import { Input, Output, EventEmitter } from '@angular/core';
import { LayoutWrapperSelectEvent } from 'layout';

export abstract class ContentControlBase {
  @Input() selected: LayoutWrapperSelectEvent;
  @Output() change = new EventEmitter();
}