import {
  Component, OnInit, Input, AfterViewInit, ViewChildren, QueryList,
  Output, EventEmitter, AfterViewChecked, Injector,
} from '@angular/core';
import { TemplateWrapperComponent } from '../template-wrapper/template-wrapper.component';
import { TemplateWrapperSelectEvent } from '../template-wrapper/template-wrapper.interface';
import { TemplateWrapperBase } from '../template-wrapper/template-wrapper-base';
import { ContentTemplateInfoModel } from '../../../global/api/data-model/models/content-template-info.model';

@Component({
  selector: 'rdr-templates-container',
  templateUrl: './templates-container.component.html',
  styleUrls: ['./templates-container.component.scss'],
})
export class TemplatesContainerComponent extends TemplateWrapperBase implements OnInit, AfterViewInit, AfterViewChecked {
  @Input() whiteList: string[] = [];
  @Input() templates: ContentTemplateInfoModel[];

  // tslint:disable-next-line: no-output-native
  @Output() select = new EventEmitter<TemplateWrapperSelectEvent>();
  @Output() enter = new EventEmitter<HTMLElement>();
  @Output() leave = new EventEmitter<HTMLElement>();

  @ViewChildren(TemplateWrapperComponent) templateWrapperComponents: QueryList<TemplateWrapperComponent>;

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
    if (this.templateWrapperComponents) {
      this.templateWrapperComponents.forEach(lw => lw.parentTemplatesContainer = this);
    }
    this.changeDetectorRef.detectChanges();
  }

  mouseenter() {
    // container不用輸出enter/leave
  }

  mouseleave() {
    // container不用輸出enter/leave
  }

}
