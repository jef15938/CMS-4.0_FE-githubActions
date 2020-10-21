import { Component, Injector } from '@angular/core';
import { GroupTemplateBaseComponent } from '../../../function/wrapper/layout-base/group-template-base.component';
import { GroupTemplateInfo } from '../../interface/group-template-info.interface';
import { ContentFieldInfoFieldType } from '../../api/data-model/models/content-field-info.model';

const TEMPLATE_ID = 'list';

@Component({
  selector: 'rdr-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends GroupTemplateBaseComponent {

  defaultTemplateInfo: GroupTemplateInfo = {
    id: '',
    templateId: TEMPLATE_ID,
    fields: [],
    attributes: {
      maxItemCounts: 4,
      itemDisplayFieldId: 'title',
    },
    itemList: [
      [
        {
          extension: {
            hideden: false,
          },
          fieldId: 'title',
          fieldType: ContentFieldInfoFieldType.TEXT,
          fieldVal: '標題',
        },
        {
          extension: {
            hideden: false,
          },
          fieldId: 'text',
          fieldType: ContentFieldInfoFieldType.TEXT,
          fieldVal: '內文',
        }
      ]
    ],
  };

  constructor(injector: Injector) { super(injector, TEMPLATE_ID); }

}
