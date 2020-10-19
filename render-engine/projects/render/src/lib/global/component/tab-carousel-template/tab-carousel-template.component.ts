import { Component, Injector, OnInit } from '@angular/core';
import { TabTemplateBaseComponent } from '../../../function/wrapper/layout-base/tab-template-base.component';
import { TabTemplateInfo } from '../../interface/tab-template-info.interface';
import { ContentFieldInfoFieldType } from '../../api/data-model/models/content-field-info.model';
import { TabData } from '../public-component/tab/tab.inerface';

const TEMPLATE_ID = 'Tab';

@Component({
  selector: 'rdr-tab-carousel-template',
  templateUrl: './tab-carousel-template.component.html',
  styleUrls: ['./tab-carousel-template.component.scss']
})
export class TabCarouselTemplateComponent extends TabTemplateBaseComponent implements OnInit {
  defaultTemplateInfo: TabTemplateInfo = {
    id: 'tp1',
    templateId: TEMPLATE_ID,
    fields: [],
    attributes: {
      maxItemCounts: 20,
      maxTotalTitlesLength: 1000,
    },
    tabList: [
      {
        fieldId: 'f1',
        fieldType: ContentFieldInfoFieldType.GROUP,
        fieldVal: '標籤一',
        extension: {
          titleMaxLength: 15,
        },
        tabId: 't1',
        children: []
      },
      {
        fieldId: 'f2',
        fieldType: ContentFieldInfoFieldType.GROUP,
        fieldVal: '標籤二',
        extension: {
          titleMaxLength: 15,
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
    return { title: item.fieldVal, content: item.children };
  }
}
