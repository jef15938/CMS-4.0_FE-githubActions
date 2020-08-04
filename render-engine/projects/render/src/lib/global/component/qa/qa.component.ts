import { Component, Injector } from '@angular/core';
import { DataSourceTemplateBaseComponent } from '../../../function/wrapper/layout-base/data-source-template-base.component';
import { QaData } from './qa.interface';
import { DataSourceTemplateInfo } from '../../interface/data-source-template-info.interface';
import { DataSourceType } from '../../enum';

@Component({
  selector: 'rdr-qa',
  templateUrl: './qa.component.html',
  styleUrls: ['./qa.component.scss']
})
export class QaComponent extends DataSourceTemplateBaseComponent<QaData> {

  defaultTemplateInfo: DataSourceTemplateInfo = {
    id: '',
    templateId: 'QA',
    fields: [],
    source: '',
    attributes: {
      height: '592px'
    }
  };

  sourceType = DataSourceType.QA;

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }



}
