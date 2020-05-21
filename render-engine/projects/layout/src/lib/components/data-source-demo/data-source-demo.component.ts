import { Component, OnInit } from '@angular/core';
import { TemplateType } from '../../wrapper/layout-wrapper/layout-wrapper.interface';
import { DataSourceTemplateBaseComponent } from '../../wrapper/layout-base/data-source-template-base.component';

@Component({
  selector: 'lib-data-source-demo',
  templateUrl: './data-source-demo.component.html',
  styleUrls: ['./data-source-demo.component.css']
})
export class DataSourceDemoComponent extends DataSourceTemplateBaseComponent implements OnInit {

  ngOnInit(): void {
  }

}
