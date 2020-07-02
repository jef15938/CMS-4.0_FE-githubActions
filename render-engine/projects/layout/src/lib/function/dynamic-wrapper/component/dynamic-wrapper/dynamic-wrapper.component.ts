import { Component, ViewChild, ViewContainerRef, Injector } from '@angular/core';
import { DynamicWrapperBase } from '../../base/dynamic-wrapper-base';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'neux-dynamic-wrapper',
  templateUrl: './dynamic-wrapper.component.html',
  styleUrls: ['./dynamic-wrapper.component.scss']
})
export class DynamicWrapperComponent<TComponent> extends DynamicWrapperBase<TComponent> {

  @ViewChild('DynamicHost', { read: ViewContainerRef }) protected host: ViewContainerRef;

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }

}
