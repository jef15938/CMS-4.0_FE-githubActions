import { Component, OnInit, Input, ComponentRef, HostListener, Output, EventEmitter } from '@angular/core';
import { TemplatesContainerComponent, LayoutWrapperComponent } from '@neux/render';

@Component({
  selector: 'cms-add-template-button',
  templateUrl: './add-template-button.component.html',
  styleUrls: ['./add-template-button.component.scss']
})
export class AddTemplateButtonComponent implements OnInit {

  isHover = false;
  isSelected = false;

  @Input() position: number;
  @Input() componentRef: ComponentRef<AddTemplateButtonComponent>;
  @Input() contextEventEmitter: EventEmitter<AddTemplateButtonComponent>;
  @Input() targetLayoutWrapper: LayoutWrapperComponent;
  @Input() templatesContainer: TemplatesContainerComponent;
  @Input() rootTemplatesContainer: TemplatesContainerComponent;
  @Input() disabled = false;

  constructor() { }

  ngOnInit(): void {
    this.isHover = false;
  }

  @HostListener('mouseenter') mouseenter() {
    this.isHover = true;
  }

  @HostListener('mouseleave') mouseleave() {
    this.isHover = false;
  }

  onClick(ev) {
    ev.stopPropagation();
    this.contextEventEmitter.emit(this);
  }

}
