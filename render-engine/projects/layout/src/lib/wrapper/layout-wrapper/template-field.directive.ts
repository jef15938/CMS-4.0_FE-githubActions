import { Directive, Input, OnInit, HostListener, ElementRef, Output, EventEmitter, HostBinding } from '@angular/core';
import { FieldInfo } from '../../interface/field-info.interface';
import { TemplateFieldSelectEvent, LayoutWrapperSelectedTargetType } from './layout-wrapper.interface';

@Directive({
  selector: '[libTemplateField]'
})
export class TemplateFieldDirective implements OnInit {

  @Input('libTemplateField') fieldInfo: FieldInfo;
  @Output() select = new EventEmitter<TemplateFieldSelectEvent>();

  @HostBinding('class.now-hover') private ishovering: boolean;

  constructor(
    private _elementRef: ElementRef,
  ) { }

  ngOnInit(): void {

  }

  @HostListener('click', ['$event']) click(ev) {
    ev.stopPropagation();
    this.select.emit({
      selectedTarget: this._elementRef?.nativeElement,
      selectedTargetType: LayoutWrapperSelectedTargetType.FIELD,
      fieldInfo: this.fieldInfo,
    });
  }

  @HostListener('mouseenter') mouseenter() {
    this.ishovering = true;
  }

  @HostListener('mouseleave') mouseleave() {
    this.ishovering = false;
  }

}
