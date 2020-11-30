import { Component, Injector } from '@angular/core';
import { CommonTemplateBaseComponent } from '../../../function/wrapper/template-base/common-template-base.component';
import { ContentTemplateInfoModel } from '../../api/data-model/models/content-template-info.model';

const TEMPLATE_ID = 'FixedWrapper';

@Component({
  selector: 'rdr-fixed-wrapper',
  templateUrl: './fixed-wrapper.component.html',
  styleUrls: ['./fixed-wrapper.component.scss']
})
export class FixedWrapperComponent extends CommonTemplateBaseComponent {

  defaultTemplateInfo: ContentTemplateInfoModel = {
    id: '',
    templateId: TEMPLATE_ID,
    fields: [],
    attributes: {
      templates: []
    },
  };

  constructor(injector: Injector) { super(injector, TEMPLATE_ID); }

}
