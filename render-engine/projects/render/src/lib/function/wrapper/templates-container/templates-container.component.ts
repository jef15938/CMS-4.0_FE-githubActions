import {
  Component, OnInit, Input, AfterViewInit, ViewChildren, QueryList,
  Output, EventEmitter, AfterViewChecked, Injector
} from '@angular/core';
import { LayoutWrapperComponent } from '../layout-wrapper/layout-wrapper.component';
import { LayoutWrapperSelectEvent } from '../layout-wrapper/layout-wrapper.interface';
import { LayoutWrapperBase } from '../layout-wrapper/layout-wrapper-base';
import { ContentTemplateInfoModel } from '../../../global/api/data-model/models/content-template-info.model';

@Component({
  selector: 'rdr-templates-container',
  templateUrl: './templates-container.component.html',
  styleUrls: ['./templates-container.component.scss']
})
export class TemplatesContainerComponent extends LayoutWrapperBase implements OnInit, AfterViewInit, AfterViewChecked {

  @Input() templates: ContentTemplateInfoModel[];

  // tslint:disable-next-line: no-output-native
  @Output() select = new EventEmitter<LayoutWrapperSelectEvent>();
  @Output() enter = new EventEmitter<HTMLElement>();
  @Output() leave = new EventEmitter<HTMLElement>();

  @ViewChildren(LayoutWrapperComponent) layoutWrapperComponents: QueryList<LayoutWrapperComponent>;

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }

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
