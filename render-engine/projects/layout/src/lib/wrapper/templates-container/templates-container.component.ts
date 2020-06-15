import { Component, OnInit, Input, AfterViewInit, ViewChildren, QueryList, Output, EventEmitter, ElementRef, AfterViewChecked } from '@angular/core';
import { TemplateInfo } from '../../interface/template-info.interface';
import { LayoutWrapperComponent } from '../layout-wrapper/layout-wrapper.component';
import { LayoutWrapperSelectEvent } from '../layout-wrapper/layout-wrapper.interface';
import { LayoutWrapperBase } from '../layout-wrapper/layout-wrapper-base';

@Component({
  selector: 'templates-container',
  templateUrl: './templates-container.component.html',
  styleUrls: ['./templates-container.component.scss']
})
export class TemplatesContainerComponent extends LayoutWrapperBase implements OnInit, AfterViewInit, AfterViewChecked {

  @Input() mode: 'preview' | 'edit' = 'preview';
  @Input() templates: TemplateInfo[];

  @Output() select = new EventEmitter<LayoutWrapperSelectEvent>();
  @Output() enter = new EventEmitter<HTMLElement>();
  @Output() leave = new EventEmitter<HTMLElement>();

  @ViewChildren(LayoutWrapperComponent) layoutWrapperComponents: QueryList<LayoutWrapperComponent>;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngAfterViewChecked(): void {
    if (this.layoutWrapperComponents) {
      this.layoutWrapperComponents.forEach(lw => lw.parentTemplatesContainer = this);
    }
  }

  mouseenter() {
    // container不用輸出enter/leave
  }

  mouseleave() {
    // container不用輸出enter/leave
  }

}
