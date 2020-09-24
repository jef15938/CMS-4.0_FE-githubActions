import { Component, Injector } from '@angular/core';
import { ContentTemplateInfoModel } from '../../api/data-model/models/content-template-info.model';
import { ContentFieldInfoFieldType } from '../../api/data-model/models/content-field-info.model';
import { CommonTemplateBaseComponent } from '../../../function/wrapper/layout-base/common-template-base.component';

const TEMPLATE_ID = 'banner';

@Component({
  selector: 'rdr-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent extends CommonTemplateBaseComponent {

  defaultTemplateInfo: ContentTemplateInfoModel = {
    id: '',
    templateId: TEMPLATE_ID,
    fields: [{
      extension: {},
      fieldId: 'title',
      fieldType: ContentFieldInfoFieldType.TEXT,
      fieldVal: 'Banner 標題',
    }, {
      extension: {},
      fieldId: 'subtitle',
      fieldType: ContentFieldInfoFieldType.TEXT,
      fieldVal: 'Banner 次標題',
    }],
    attributes: {
      templates: []
    },
  };

  constructor(injector: Injector) { super(injector, TEMPLATE_ID); }

}
