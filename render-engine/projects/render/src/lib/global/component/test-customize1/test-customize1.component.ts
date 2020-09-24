import { Component, Injector } from '@angular/core';
import { ContentTemplateInfoModel } from '../../api/data-model/models/content-template-info.model';
import { CustomizeTemplateBaseComponent } from '../../../function/wrapper/layout-base/customize-template-base.component';

const TEMPLATE_ID = 'test_customize1';

@Component({
  selector: 'rdr-test-customize1',
  templateUrl: './test-customize1.component.html',
  styleUrls: ['./test-customize1.component.scss']
})
export class TestCustomize1Component extends CustomizeTemplateBaseComponent {

  defaultTemplateInfo: ContentTemplateInfoModel = {
    id: '',
    templateId: TEMPLATE_ID,
    fields: [],
    attributes: {},
  };

  constructor(injector: Injector) { super(injector, TEMPLATE_ID); }

}
