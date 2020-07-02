import { Directive, ViewContainerRef, Injector } from '@angular/core';
import { DynamicWrapperBase } from '../base/dynamic-wrapper-base';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[neuxDynamicWrapper]'
})
export class DynamicWrapperDirective<TComponent> extends DynamicWrapperBase<TComponent> {

  constructor(
    injector: Injector,
    protected host: ViewContainerRef,
  ) {
    super(injector);
  }

}
