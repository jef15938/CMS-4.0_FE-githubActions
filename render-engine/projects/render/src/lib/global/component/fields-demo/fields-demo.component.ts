import { Component, OnInit, Injector } from '@angular/core';
import { CommonTemplateBaseComponent } from '../../../function/wrapper/layout-base/common-template-base.component';
import { TemplateInfo } from '../../interface/template-info.interface';

@Component({
  selector: 'rdr-fields-demo',
  templateUrl: './fields-demo.component.html',
  styleUrls: ['./fields-demo.component.scss']
})
export class FieldsDemoComponent extends CommonTemplateBaseComponent implements OnInit {

  defaultTemplateInfo: TemplateInfo = {
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
