import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[cmsModalCustomWrapper]'
})
export class ModalCustomWrapperDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }

}
