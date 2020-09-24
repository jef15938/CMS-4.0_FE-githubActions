import { Component, Injector, Inject } from '@angular/core';
import { CommonTemplateBaseComponent } from '../../../function/wrapper/layout-base/common-template-base.component';
import { ContentTemplateInfoModel } from '../../api/data-model/models/content-template-info.model';
import { RENDER_ENVIROMENT_TOKEN } from '../../injection-token/injection-token';
import { RenderEnvironment } from '../../interface/render-environment.interface';

const TEMPLATE_ID = 'FieldsDemo';

@Component({
  selector: 'rdr-fields-demo',
  templateUrl: './fields-demo.component.html',
  styleUrls: ['./fields-demo.component.scss']
})
export class FieldsDemoComponent extends CommonTemplateBaseComponent {

  defaultTemplateInfo: ContentTemplateInfoModel = {
    id: '',
    templateId: TEMPLATE_ID,
    fields: [],
    attributes: {},
  };

  constructor(
    injector: Injector,
    @Inject(RENDER_ENVIROMENT_TOKEN) public enviroment: RenderEnvironment,
  ) {
    super(injector, TEMPLATE_ID);
  }

}
