import { Component, Injector } from '@angular/core';
import { ContentTemplateInfoModel } from '../../api/data-model/models/content-template-info.model';
import { CommonTemplateBaseComponent } from '../../../function/wrapper/template-base/common-template-base.component';

const TEMPLATE_ID = 'social-media';

@Component({
  selector: 'rdr-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss']
})
export class SocialMediaComponent extends CommonTemplateBaseComponent {

  defaultTemplateInfo: ContentTemplateInfoModel = {
    id: '',
    templateId: TEMPLATE_ID,
    fields: [],
    attributes: {},
  };

  constructor(injector: Injector) { super(injector, TEMPLATE_ID); }

}
