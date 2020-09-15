import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ContentTemplateInfoModel } from '../../api/data-model/models/content-template-info.model';
import { SitesResponseModel } from '../../api/data-model/models/sites-response.model';
import { WithRenderInfo } from '../../../function/wrapper/layout-wrapper/layout-wrapper.interface';
import { TemplatesContainerComponent, LayoutWrapperComponent } from '../../../function/wrapper';

const mockPrevious = [
  {
    id: '',
    templateId: 'content-left',
    fields: [],
    children: [
      {
        id: '7533967',
        templateId: 'banner',
        fields: [
          {
            fieldId: 'title',
            fieldType: 'TEXT',
            fieldVal: 'Mock 資料',
            extension: {}
          },
          {
            fieldId: 'subtitle',
            fieldType: 'TEXT',
            fieldVal: '路由請用 /preview/zh_TW/1558',
            extension: {}
          }
        ],
        attributes: {
          templates: []
        }
      },
      {
        id: '1599616944827',
        templateId: 'banner',
        fields: [
          {
            fieldId: 'title',
            fieldType: 'TEXT',
            fieldVal: 'Banner123',
            extension: {}
          },
          {
            fieldId: 'subtitle',
            fieldType: 'TEXT',
            fieldVal: '我是Banner In Table我是Banner In Table456',
            extension: {}
          }
        ],
        attributes: {
          templates: []
        }
      },
      {
        id: '1599620859110',
        templateId: 'list',
        fields: [],
        attributes: {},
        itemList: [
          [
            {
              extension: {},
              fieldId: 'title',
              fieldType: 'TEXT',
              fieldVal: '標題1'
            },
            {
              extension: {},
              fieldId: 'text',
              fieldType: 'TEXT',
              fieldVal: '內文1'
            }
          ],
          [
            {
              extension: {},
              fieldId: 'title',
              fieldType: 'TEXT',
              fieldVal: '標題2'
            },
            {
              extension: {},
              fieldId: 'text',
              fieldType: 'TEXT',
              fieldVal: '內文2'
            }
          ],
          [
            {
              extension: {},
              fieldId: 'title',
              fieldType: 'TEXT',
              fieldVal: '標題3'
            },
            {
              extension: {},
              fieldId: 'text',
              fieldType: 'TEXT',
              fieldVal: '內文3'
            }
          ]
        ]
      },
      {
        id: '1599622612445',
        templateId: 'Tab',
        fields: [],
        attributes: {},
        tabList: [
          {
            fieldId: 'f1',
            fieldType: 'GROUP',
            fieldVal: '',
            extension: {},
            tabId: 't1',
            children: [
              {
                id: '1599622630427',
                templateId: 'HTML',
                fields: [
                  {
                    fieldId: 'html',
                    fieldType: 'HTMLEDITOR',
                    fieldVal: '<p>HTMLEDITOR測試</p>',
                    extension: {}
                  }
                ],
                attributes: {}
              }
            ]
          },
          {
            fieldId: 'f2',
            fieldType: 'GROUP',
            fieldVal: '',
            extension: {},
            tabId: 't2',
            children: [
              {
                id: 'banner-in-table-test-deleted',
                templateId: 'banner',
                fields: [
                  {
                    fieldId: 'title',
                    fieldType: 'TEXT',
                    fieldVal: 'Banner In Table',
                    extension: {}
                  },
                  {
                    fieldId: 'subtitle',
                    fieldType: 'TEXT',
                    fieldVal: '我是banner我是banner456',
                    extension: {}
                  }
                ],
                attributes: {
                  templates: []
                }
              }
            ]
          }
        ]
      },
      {
        id: '1599622698533',
        templateId: 'qa',
        fields: [],
        source: 'portal',
        attributes: {
          height: '592px'
        }
      },
      {
        id: '1599622682030',
        templateId: 'download',
        fields: [],
        source: '555',
        attributes: {
          height: '592px'
        }
      }
    ],
    attributes: {
      sitemap: null
    }
  }
];

@Component({
  selector: 'rdr-render-preview-container',
  templateUrl: './render-preview-container.component.html',
  styleUrls: ['./render-preview-container.component.scss']
})
export class RenderPreviewContainerComponent implements WithRenderInfo, OnInit {

  @ViewChild('previous') previousTemplatesContainerComponent: TemplatesContainerComponent;
  @ViewChild('current') currentTemplatesContainerComponent: TemplatesContainerComponent;

  @Input() templates: ContentTemplateInfoModel[];
  @Input() mode: 'preview' | 'edit';
  @Input() runtime: boolean;
  @Input() sites: SitesResponseModel;
  fixed = false;

  previousTemplates: any = mockPrevious;

  funcCompare = {
    on: false,
    inited: false,
  };

  constructor() { }

  ngOnInit(): void {
  }

  toggleCompare() {
    if (!this.funcCompare.inited && (!this.previousTemplatesContainerComponent || !this.currentTemplatesContainerComponent)) {
      if (!this.previousTemplatesContainerComponent) {
        alert('沒有之前的版本');
      } else {
        alert('沒有當前的版本');
      }
      return;
    }

    this.funcCompare.on = !this.funcCompare.on;

    if (!this.funcCompare.inited) {
      const previous = this.previousTemplatesContainerComponent;
      const current = this.currentTemplatesContainerComponent;
      // console.warn({ previous, current });

      const previousLayoutWrappers = this.getFlattenLayoutWrapper(previous).filter(x => !!x.templateInfo?.id);
      const currentLayoutWrappers = this.getFlattenLayoutWrapper(current).filter(x => !!x.templateInfo?.id);
      // console.warn({ previousLayoutWrappers, currentLayoutWrappers });

      const previousLayoutWrapperTemplateInfoIds = previousLayoutWrappers.map(x => x.templateInfo.id);
      const currentLayoutWrapperTemplateInfoIds = currentLayoutWrappers.map(x => x.templateInfo.id);
      // console.warn({ previousLayoutWrapperTemplateInfoIds, currentLayoutWrapperTemplateInfoIds });

      previousLayoutWrappers.forEach(lw => {
        const templateInfoId = lw.templateInfo.id;
        if (currentLayoutWrapperTemplateInfoIds.indexOf(templateInfoId) < 0) {
          const el = (lw.elementRef.nativeElement as HTMLElement);
          el.classList.add('modified', 'deleted');
        }
      });

      currentLayoutWrappers.forEach(lw => {
        const templateInfoId = lw.templateInfo.id;
        const el = (lw.elementRef.nativeElement as HTMLElement);
        // console.log({ templateInfoId, lw });
        const previousLayoutWrapperTemplateInfoIdIndex = previousLayoutWrapperTemplateInfoIds.indexOf(templateInfoId);
        if (previousLayoutWrapperTemplateInfoIdIndex < 0) { // 新加入的版面(不在舊的)
          el.classList.add('modified', 'added');
        } else {
          const currentLayoutWraper = lw;
          const previousLayoutWraper = previousLayoutWrappers[previousLayoutWrapperTemplateInfoIdIndex];
          // console.warn('previousLayoutWraper = ', previousLayoutWraper);
          if (JSON.stringify(previousLayoutWraper.templateInfo) === JSON.stringify(currentLayoutWraper.templateInfo)) { return; } // 版面資料沒變更
          el.classList.add('modified', 'changed');
          (previousLayoutWraper.elementRef.nativeElement as HTMLElement).classList.add('modified', 'changed');

          const previousFields = previousLayoutWraper.componentRef.instance.templateFieldDirectives;
          const currentFields = currentLayoutWraper.componentRef.instance.templateFieldDirectives;
          const previousFieldIds = previousFields.map(field => field.fieldInfo.fieldId);

          currentFields.forEach(currentField => {
            const currentFieldId = currentField.fieldInfo.fieldId;

            const hasMultipleSameFieldId = // Group 類型的版面會有複數同樣 fieldId 的欄位
              currentFields.filter(f => f.fieldInfo.fieldId === currentFieldId).length > 1
              || previousFields.filter(f => f.fieldInfo.fieldId === currentFieldId).length > 1;
            if (hasMultipleSameFieldId) { return; }

            const previousFieldIdIndex = previousFieldIds.indexOf(currentFieldId);
            if (previousFieldIdIndex < 0) { return; }
            const previousField = previousFields[previousFieldIdIndex];
            if (JSON.stringify(previousField.fieldInfo) === JSON.stringify(currentField.fieldInfo)) { return; } // 欄位資料沒變更
            (previousField.elementRef.nativeElement as HTMLElement).classList.add('field-modified');
            (currentField.elementRef.nativeElement as HTMLElement).classList.add('field-modified');
          });
        }
      });

      this.funcCompare.inited = true;
    }
  }

  private getFlattenLayoutWrapper(source: TemplatesContainerComponent, result: LayoutWrapperComponent[] = []) {
    source.layoutWrapperComponents.forEach(lw => {
      result.push(lw);
      (lw.componentRef?.instance?.templatesContainerComponents || []).forEach(tc => this.getFlattenLayoutWrapper(tc, result));
    });
    return result;
  }

}
