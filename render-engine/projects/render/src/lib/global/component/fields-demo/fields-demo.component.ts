import { Component, OnInit, Injector } from '@angular/core';
import { CommonTemplateBaseComponent } from '../../../function/wrapper/layout-base/common-template-base.component';
import { ContentTemplateInfoModel } from '../../api/data-model/models/content-template-info.model';

@Component({
  selector: 'rdr-fields-demo',
  templateUrl: './fields-demo.component.html',
  styleUrls: ['./fields-demo.component.scss']
})
export class FieldsDemoComponent extends CommonTemplateBaseComponent implements OnInit {

  defaultTemplateInfo: ContentTemplateInfoModel = {
    id: '',
    templateId: 'FieldsDemo',
    fields: [],
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
