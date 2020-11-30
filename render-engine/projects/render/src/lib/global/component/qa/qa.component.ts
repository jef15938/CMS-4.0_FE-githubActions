import { Component, Injector } from '@angular/core';
import { DataSourceTemplateBaseComponent } from '../../../function/wrapper/template-base/data-source-template-base.component';
import { DataSourceTemplateInfo, QaData } from '../../interface/data-source.interface';
import { CollapseData } from '../public-component/collapse/collapse.interface';

const TEMPLATE_ID = 'qa';

@Component({
  selector: 'rdr-qa',
  templateUrl: './qa.component.html',
  styleUrls: ['./qa.component.scss']
})
export class QaComponent extends DataSourceTemplateBaseComponent<QaData> {

  defaultTemplateInfo: DataSourceTemplateInfo = {
    id: '',
    templateId: TEMPLATE_ID,
    fields: [],
    source: '',
    attributes: {
      height: '592px'
    }
  };

  constructor(injector: Injector) { super(injector, TEMPLATE_ID); }

  collapseData(item): CollapseData {
    return { title: item.question, content: item.answer };
  }
}
