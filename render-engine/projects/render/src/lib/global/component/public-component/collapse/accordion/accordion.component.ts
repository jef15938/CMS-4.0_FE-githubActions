import { ContentChild, TemplateRef } from '@angular/core';
import { Component, Injector, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CustomizeBaseDirective } from '../../base-component';
import { CollapseData } from '../collapse.interface';

@Component({
  selector: 'rdr-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccordionComponent extends CustomizeBaseDirective implements OnInit {

  @Input() collapseList: Array<CollapseData>;
  @Input() hasList = false;

  @ContentChild('title') titleTemplateRef: TemplateRef<any>;
  @ContentChild('content') contentTemplateRef: TemplateRef<any>;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

}
