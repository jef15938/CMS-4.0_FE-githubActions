import { Directive, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[cmsTreeNodeCustomWrapper]'
})
export class TreeNodeCustomWrapperDirective<TData> {

  @Input() data: TData;

  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }

}
