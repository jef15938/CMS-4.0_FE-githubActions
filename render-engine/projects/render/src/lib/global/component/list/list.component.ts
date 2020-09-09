import { Component, OnInit, Injector } from '@angular/core';
import { GroupTemplateBaseComponent } from '../../../function/wrapper/layout-base/group-template-base.component';
import { GroupTemplateInfo } from '../../interface/group-template-info.interface';
import { ContentFieldInfoFieldType } from '../../api/data-model/models/content-field-info.model';

@Component({
  selector: 'rdr-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends GroupTemplateBaseComponent implements OnInit {

  defaultTemplateInfo: GroupTemplateInfo = {
    id: '',
    templateId: 'list',
    fields: [],
    attributes: {},
    itemList: [
      [
        {
          extension: {},
          fieldId: 'title',
          fieldType: ContentFieldInfoFieldType.TEXT,
          fieldVal: '標題',
        },
        {
          extension: {},
          fieldId: 'text',
          fieldType: ContentFieldInfoFieldType.TEXT,
          fieldVal: '內文',
        }
      ]
    ],
  };

  maxItemCount = 4;
  groupItemDisplayFieldId = 'title';

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit(): void {
  }

}
