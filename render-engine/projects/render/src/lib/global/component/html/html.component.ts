import { Component, OnInit, Injector } from '@angular/core';
import { CommonTemplateBaseComponent } from '../../../function/wrapper/layout-base/common-template-base.component';
import { ContentTemplateInfoModel } from '../../api/data-model/models/content-template-info.model';
import { ContentFieldInfoFieldType } from '../../api/data-model/models/content-field-info.model';

@Component({
  selector: 'rdr-html',
  templateUrl: './html.component.html',
  styleUrls: ['./html.component.scss']
})
export class HtmlComponent extends CommonTemplateBaseComponent implements OnInit {

  defaultTemplateInfo: ContentTemplateInfoModel = {
    id: '',
    templateId: 'HTML',
    fields: [{
      fieldId: 'html',
      fieldType: ContentFieldInfoFieldType.HTMLEDITOR,
      fieldVal: '',
      extension: {},
    }],
    attributes: {},
  };

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit(): void {
  }

}
