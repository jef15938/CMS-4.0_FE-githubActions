import { Component, OnInit } from '@angular/core';
import { LayoutBaseComponent } from '../../wrapper/layout-base/_base';
import { DataSourceTemplateInfo } from '../../interface/data-source-template-info.interface';
import { TemplateType } from '../../wrapper/layout-wrapper/layout-wrapper.interface';

@Component({
  selector: 'lib-data-source-demo',
  templateUrl: './data-source-demo.component.html',
  styleUrls: ['./data-source-demo.component.css']
})
export class DataSourceDemoComponent extends LayoutBaseComponent<DataSourceTemplateInfo> implements OnInit {
  templateType = TemplateType.DATA_SOURCE;

  ngOnInit(): void {
  }

}
