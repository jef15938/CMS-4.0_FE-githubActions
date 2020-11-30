import { Component, Injector, OnInit } from '@angular/core';
import { TabTemplateBaseComponent } from '../../../function/wrapper/template-base/tab-template-base.component';
import { TabTemplateInfo } from '../../interface/tab-template-info.interface';
import { ContentFieldInfoFieldType } from '../../api/data-model/models/content-field-info.model';
import { TabData } from '../public-component/tab/tab.inerface';

const TEMPLATE_ID = 'Tab';

@Component({
  selector: 'rdr-tab-scrollable-template',
  templateUrl: './tab-scrollable-template.component.html',
  styleUrls: ['./tab-scrollable-template.component.scss']
})
export class TabScrollableTemplateComponent extends TabTemplateBaseComponent implements OnInit {

  defaultTemplateInfo: TabTemplateInfo = {
    id: 'tp1',
    templateId: TEMPLATE_ID,
    fields: [],
    attributes: {
      maxItemCounts: 8,
      maxTotalTitlesLength: 1000,
    },
    tabList: [{
      fieldId: 'f1',
      fieldType: ContentFieldInfoFieldType.GROUP,
      fieldVal: '標籤最多六字',
      extension: {
        titleMaxLength: 6,
      },
      tabId: 't1',
      children: []
    },
    {
      fieldId: 'f2',
      fieldType: ContentFieldInfoFieldType.GROUP,
      fieldVal: '標籤最多六字',
      extension: {
        titleMaxLength: 6,
      },
      tabId: 't2',
      children: []
    }
    ]
  };

  constructor(injector: Injector) {
    super(injector, TEMPLATE_ID);
  }

  ngOnInit(): void {
  }

  tabData(item): TabData {
    return {
      get title() {
        return item.fieldVal;
      },
      get content() {
        return item.children;
      }
    };
  }
}
