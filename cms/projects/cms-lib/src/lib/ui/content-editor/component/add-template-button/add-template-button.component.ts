import { Component, OnInit, Input, ComponentRef, HostListener, Output, EventEmitter } from '@angular/core';
import { ContentTemplateInfo } from './../../../../neuxAPI/bean/ContentTemplateInfo';

@Component({
  selector: 'cms-add-template-button',
  templateUrl: './add-template-button.component.html',
  styleUrls: ['./add-template-button.component.scss']
})
export class AddTemplateButtonComponent implements OnInit {

  isHover = false;
  isSelected = false;

  @Input() targetArray: ContentTemplateInfo[];
  @Input() position: number;
  @Input() componentRef: ComponentRef<AddTemplateButtonComponent>;
  @Input() contextEventEmitter: EventEmitter<AddTemplateButtonComponent>;

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
