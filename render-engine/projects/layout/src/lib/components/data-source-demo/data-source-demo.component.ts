import { Component } from '@angular/core';
import { DataSourceTemplateBaseComponent } from '../../wrapper/layout-base/data-source-template-base.component';
import { DataSourceDemoData } from './data-source-demo.interface';

@Component({
  selector: 'lib-data-source-demo',
  templateUrl: './data-source-demo.component.html',
  styleUrls: ['./data-source-demo.component.css']
})
export class DataSourceDemoComponent extends DataSourceTemplateBaseComponent<DataSourceDemoData> {

}
