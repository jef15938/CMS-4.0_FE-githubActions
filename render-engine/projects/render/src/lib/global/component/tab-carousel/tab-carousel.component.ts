import { Component, Injector, OnInit } from '@angular/core';
import { TabTemplateBaseComponent } from '../../../function/wrapper/layout-base/tab-template-base.component';
import { TabTemplateInfo } from '../../interface/tab-template-info.interface';
import { ContentFieldInfoFieldType } from '../../api/data-model/models/content-field-info.model';

const TEMPLATE_ID = 'Tab';

@Component({
  selector: 'rdr-tab-carousel',
  templateUrl: './tab-carousel.component.html',
  styleUrls: ['./tab-carousel.component.scss']
})
export class TabCarouselComponent extends TabTemplateBaseComponent implements OnInit {
  maxItemCount = 20;
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
      tabId: '標籤最多十五個字標籤最多十五個',
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
      tabId: '標籤最多十五個字',
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
