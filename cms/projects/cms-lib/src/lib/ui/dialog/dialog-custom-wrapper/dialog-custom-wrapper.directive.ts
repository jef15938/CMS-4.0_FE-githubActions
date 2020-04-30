import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[cmsDialogCustomWrapper]'
})
export class DialogCustomWrapperDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }

}
