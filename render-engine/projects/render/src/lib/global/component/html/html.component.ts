import { Component, Injector } from '@angular/core';
import { CommonTemplateBaseComponent } from '../../../function/wrapper/template-base/common-template-base.component';
import { ContentTemplateInfoModel } from '../../api/data-model/models/content-template-info.model';
import { ContentFieldInfoFieldType } from '../../api/data-model/models/content-field-info.model';

const TEMPLATE_ID = 'HTML';

@Component({
  selector: 'rdr-html',
  templateUrl: './html.component.html',
  styleUrls: ['./html.component.scss']
})
export class HtmlComponent extends CommonTemplateBaseComponent {

  defaultTemplateInfo: ContentTemplateInfoModel = {
    id: '',
    templateId: TEMPLATE_ID,
    fields: [{
      fieldId: 'html',
      fieldType: ContentFieldInfoFieldType.HTMLEDITOR,
      fieldVal: '',
      extension: {},
    }],
    attributes: {},
  };

  constructor(injector: Injector) { super(injector, TEMPLATE_ID); }

}
