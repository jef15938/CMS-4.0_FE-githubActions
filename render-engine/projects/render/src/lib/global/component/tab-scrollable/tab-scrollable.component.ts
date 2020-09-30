import { Component, Injector, OnInit } from '@angular/core';
import { TabTemplateBaseComponent } from '../../../function/wrapper/layout-base/tab-template-base.component';
import { TabTemplateInfo } from '../../interface/tab-template-info.interface';
import { ContentFieldInfoFieldType } from '../../api/data-model/models/content-field-info.model';

const TEMPLATE_ID = 'Tab';

@Component({
  selector: 'rdr-tab-scrollable',
  templateUrl: './tab-scrollable.component.html',
  styleUrls: ['./tab-scrollable.component.scss']
})
export class TabScrollableComponent extends TabTemplateBaseComponent implements OnInit {
  maxItemCount = 8;
  defaultTemplateInfo: TabTemplateInfo = {
    id: 'tp1',
    templateId: TEMPLATE_ID,
    fields: [],
    attributes: {},
    tabList: [{
      fieldId: 'f1',
      fieldType: ContentFieldInfoFieldType.GROUP,
      fieldVal: '',
      extension: {},
      tabId: '標籤最多六字',
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
      tabId: '標籤最多六字',
      children: []
    }
    ]
  };

  constructor(injector: Injector) {
    super(injector, TEMPLATE_ID);
  }

  ngOnInit(): void {
  }

}
