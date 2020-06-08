import { Directive, Output, HostListener, EventEmitter, Input } from '@angular/core';

@Directive({
  selector: '[cmsRightClickHandler]'
})
export class RightClickHandlerDirective {

  @Input() stopPropagation = true;
  @Input() preventDefault = true;

  @Output() rightClick = new EventEmitter();

  constructor() { }

  @HostListener('contextmenu', ['$event'])
  onRightClick(event) {
    if (this.stopPropagation) { event.stopPropagation(); }
    if (this.preventDefault) { event.preventDefault(); }
    this.rightClick.emit(event);
  }

}
