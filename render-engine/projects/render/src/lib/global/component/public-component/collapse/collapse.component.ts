import { Component, ContentChild, Injector, Input, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { CustomizeBaseDirective } from '../base-component';

export interface CollapseData {
  title: string;
  content: string;
}

@Component({
  selector: 'rdr-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CollapseComponent extends CustomizeBaseDirective implements OnInit {

  @Input() collapseList: Array<CollapseData>;

  @ContentChild('title') titleTemplateRef: TemplateRef<any>;
  @ContentChild('content') contentTemplateRef: TemplateRef<any>;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

}
