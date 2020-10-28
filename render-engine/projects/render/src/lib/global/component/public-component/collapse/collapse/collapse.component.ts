import { Component, ContentChild, Injector, Input, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { CustomizeBaseDirective } from '../../base-component';
import { CollapseData } from '../collapse.interface';


@Component({
  selector: 'rdr-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CollapseComponent extends CustomizeBaseDirective implements OnInit {

  @Input() collapseData: CollapseData;

  @ContentChild('title') titleTemplateRef: TemplateRef<any>;
  @ContentChild('content') contentTemplateRef: TemplateRef<any>;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

}
