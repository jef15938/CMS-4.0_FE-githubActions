import { Component, OnInit, Injector } from '@angular/core';
import { GroupTemplateBaseComponent } from '../../../function/wrapper/layout-base/group-template-base.component';
import { GroupTemplateInfo } from '../../interface/group-template-info.interface';

@Component({
  selector: 'rdr-group-template-demo',
  templateUrl: './group-template-demo.component.html',
  styleUrls: ['./group-template-demo.component.scss']
})
export class GroupTemplateDemoComponent extends GroupTemplateBaseComponent implements OnInit {

  defaultTemplateInfo: GroupTemplateInfo = {
    id: '',
    templateId: 'IconPage',
    fields: [],
    attributes: {},
    itemList: [],
  };

  maxItemCount = 4;
  groupItemDisplayFieldId = 'name';

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit(): void {
  }

}
