import { Component, OnInit, Injector } from '@angular/core';
import { ContentTemplateInfoModel } from '../../api/data-model/models/content-template-info.model';
import { ContentFieldInfoFieldType } from '../../api/data-model/models/content-field-info.model';
import { CustomizeTemplateBaseComponent } from '../../../function/wrapper/layout-base/customize-template-base.component';

@Component({
  selector: 'rdr-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent extends CustomizeTemplateBaseComponent implements OnInit {
  sourceType = 'news';

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
