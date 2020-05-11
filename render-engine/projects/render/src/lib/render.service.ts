import { Injectable } from '@angular/core';
import { ContentInfo, TabTemplateInfo, FieldType } from '@layout';

@Injectable({
  providedIn: 'root'
})
export class RenderService {

  constructor() { }

  getContentInfo(pageId: string): ContentInfo {
    const tabTemplateInfo: TabTemplateInfo = {
      id: '1',
      templateId: 'Tab',
      fieldList: [],
      attributeMap: new Map(),
      tabList: [{
        fieldId: '1-1',
        fieldType: FieldType.GROUP,
        fieldVal: '',
        extensionMap: new Map(),
        tabId: '1-1',
        child: {
          id: '2',
          templateId: 'IconPage',
          fieldList: [],
          attributeMap: new Map(),
          toJson: () => ''
        }
      }, {
        fieldId: '1-2',
        fieldType: FieldType.GROUP,
        fieldVal: '',
        extensionMap: new Map(),
        tabId: '1-2',
        child: {
          id: '3',
          templateId: 'Slide',
          fieldList: [],
          attributeMap: new Map(),
          toJson: () => ''
        }
      }],
      toJson: () => ''
    };

    const mock: ContentInfo = {
      templateList: [tabTemplateInfo],
    };

    return mock;
  }

}
