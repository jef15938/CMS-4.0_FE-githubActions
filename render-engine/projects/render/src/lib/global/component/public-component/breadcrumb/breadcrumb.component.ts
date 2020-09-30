import { Component, Input, OnInit, ViewEncapsulation, Injector } from '@angular/core';
import { Breadcrumb } from '@neux/ui';
import { CustomizeBaseDirective } from '../base-component';

@Component({
  selector: 'rdr-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BreadcrumbComponent extends CustomizeBaseDirective implements OnInit {

  @Input() dataList: Array<Breadcrumb>;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

}
