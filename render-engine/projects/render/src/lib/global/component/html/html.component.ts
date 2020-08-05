import { Component, OnInit, Injector } from '@angular/core';
import { CommonTemplateBaseComponent } from '../../../function/wrapper/layout-base/common-template-base.component';
import { ContentTemplateInfo, FieldType } from '../../interface';

@Component({
  selector: 'rdr-html',
  templateUrl: './html.component.html',
  styleUrls: ['./html.component.scss']
})
export class HtmlComponent extends CommonTemplateBaseComponent implements OnInit {

  defaultTemplateInfo: ContentTemplateInfo = {
    id: '',
    templateId: 'HTML',
    fields: [{
      fieldId: 'html',
      fieldType: FieldType.HTMLEDITOR,
      fieldVal: '<p>請輸入 HTML 內容</p>',
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
