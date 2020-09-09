import { Component, OnInit, Injector } from '@angular/core';
import { CommonTemplateBaseComponent } from '../../../function/wrapper/layout-base/common-template-base.component';
import { ContentTemplateInfoModel } from '../../api/data-model/models/content-template-info.model';
import { ContentFieldInfoFieldType } from '../../api/data-model/models/content-field-info.model';

@Component({
  selector: 'rdr-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent extends CommonTemplateBaseComponent implements OnInit {

  defaultTemplateInfo: ContentTemplateInfoModel = {
    id: '',
    templateId: 'banner',
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

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit(): void {
  }

}
