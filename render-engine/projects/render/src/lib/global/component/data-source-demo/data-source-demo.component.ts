import { Component, Injector } from '@angular/core';
import { DataSourceTemplateBaseComponent } from '../../../function/wrapper/layout-base/data-source-template-base.component';
import { DataSourceDemoData } from './data-source-demo.interface';

@Component({
  selector: 'rdr-data-source-demo',
  templateUrl: './data-source-demo.component.html',
  styleUrls: ['./data-source-demo.component.scss']
})
export class DataSourceDemoComponent extends DataSourceTemplateBaseComponent<DataSourceDemoData> {

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }

}
