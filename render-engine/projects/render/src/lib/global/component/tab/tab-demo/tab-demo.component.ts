import { Component, OnInit, Injector } from '@angular/core';
import { TabTemplateBaseComponent } from '../../../../function/wrapper/layout-base/tab-template-base.component';
import { TabTemplateInfo } from '../../../interface/tab-template-info.interface';
import { ContentFieldInfoFieldType } from '../../../api/data-model/models/content-field-info.model';

@Component({
  selector: 'rdr-tab-demo',
  templateUrl: './tab-demo.component.html',
  styleUrls: ['./tab-demo.component.scss'],
})
export class TabDemoComponent extends TabTemplateBaseComponent implements OnInit {

  defaultTemplateInfo: TabTemplateInfo = {
    id: 'tp1',
    templateId: 'Tab',
    fields: [],
    attributes: {},
    tabList: [{
      fieldId: 'f1',
      fieldType: ContentFieldInfoFieldType.GROUP,
      fieldVal: '',
      extension: {},
      tabId: 't1',
      children: [{
        id: 'c1',
        templateId: 'IconPage',
        fields: [],
        attributes: {}
      }]
    },
    {
      fieldId: 'f2',
      fieldType: ContentFieldInfoFieldType.GROUP,
      fieldVal: '',
      extension: {},
      tabId: 't2',
      children: []
    }
    ]
  };

  maxItemCount = 3;

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit() {
  }
}
