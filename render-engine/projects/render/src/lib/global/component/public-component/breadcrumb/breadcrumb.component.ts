import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Breadcrumb } from '@neux/ui';

@Component({
  selector: 'rdr-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BreadcrumbComponent implements OnInit {

  @Input() dataList: Array<Breadcrumb>;
  constructor() { }

  ngOnInit(): void {
  }

}
