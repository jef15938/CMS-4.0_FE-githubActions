import { Component, Injector } from '@angular/core';
import { CommonTemplateBaseComponent } from '../../../function/wrapper/template-base/common-template-base.component';
import { ContentTemplateInfoModel } from '../../api/data-model/models/content-template-info.model';

const TEMPLATE_ID = 'IconPage';

@Component({
  selector: 'rdr-icon-page',
  templateUrl: './icon-page.component.html',
  styleUrls: ['./icon-page.component.scss']
})
export class IconPageComponent extends CommonTemplateBaseComponent {
  defaultTemplateInfo: ContentTemplateInfoModel = {
    id: '',
    templateId: TEMPLATE_ID,
    fields: [],
    attributes: {},
  };

  constructor(injector: Injector) { super(injector, TEMPLATE_ID); }

}
