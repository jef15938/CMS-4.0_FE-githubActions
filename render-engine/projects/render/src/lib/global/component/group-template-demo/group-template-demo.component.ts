import { Component, Injector } from '@angular/core';
import { GroupTemplateBaseComponent } from '../../../function/wrapper/template-base/group-template-base.component';
import { GroupTemplateInfo } from '../../interface/group-template-info.interface';

const TEMPLATE_ID = 'GroupDemo';

@Component({
  selector: 'rdr-group-template-demo',
  templateUrl: './group-template-demo.component.html',
  styleUrls: ['./group-template-demo.component.scss']
})
export class GroupTemplateDemoComponent extends GroupTemplateBaseComponent {

  defaultTemplateInfo: GroupTemplateInfo = {
    id: '',
    templateId: TEMPLATE_ID,
    fields: [],
    attributes: {
      maxItemCounts: 4,
      itemDisplayFieldId: 'name',
    },
    itemList: [],
  };

  constructor(injector: Injector) { super(injector, TEMPLATE_ID); }

}
