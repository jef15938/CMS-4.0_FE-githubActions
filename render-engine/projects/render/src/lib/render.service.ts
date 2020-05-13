import { Injectable } from '@angular/core';
import { ContentInfo, TabTemplateInfo, FieldType, TemplateInfo } from '@layout';

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
        children: {
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
        children: {
          id: '3',
          templateId: 'Slide',
          fieldList: [],
          attributeMap: new Map(),
          toJson: () => ''
        }
      }],
      toJson: () => ''
    };

    const fieldsDemoTemplateInfo: TemplateInfo = {
      id: 'fd01',
      templateId: 'FieldsDemo',
      fieldList: [
        {
          fieldId: 'f01',
          fieldType: FieldType.TEXT,
          fieldVal: 'This is TEXT field.',
          extensionMap: new Map(),
        },
        {
          fieldId: 'f02',
          fieldType: FieldType.TEXTEREA,
          fieldVal: 'This is TEXTEREA field.',
          extensionMap: new Map(),
        },
        {
          fieldId: 'f03',
          fieldType: FieldType.LINK,
          fieldVal: 'https://www.google.com.tw',
          extensionMap: new Map(),
        },
        {
          fieldId: 'f04',
          fieldType: FieldType.BGIMG,
          fieldVal: 'https://garden.decoder.com.tw/demo_cms/assets/img/CMS-login-bg.png',
          extensionMap: new Map(),
        },
        {
          fieldId: 'f05',
          fieldType: FieldType.IMG,
          fieldVal: 'http://www.neux.com.tw/neuximg/neuxLOGO.png',
          extensionMap: new Map(),
        },
        {
          fieldId: 'f06',
          fieldType: FieldType.GROUP,
          fieldVal: '',
          extensionMap: new Map(),
        },
        {
          fieldId: 'f06',
          fieldType: FieldType.HTMLEDITOR,
          fieldVal: '',
          extensionMap: new Map(),
        }
      ],
      attributeMap: new Map(),
      toJson: () => ''
    };

    const mock: ContentInfo = {
      templateList: [
        fieldsDemoTemplateInfo,
        tabTemplateInfo
      ],
    };

    return mock;
  }

}
