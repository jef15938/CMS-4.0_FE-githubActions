import { Component, OnInit } from '@angular/core';
import { GroupTemplateBaseComponent } from '../../wrapper/layout-base/group-template-base.component';

@Component({
  selector: 'lib-group-template-demo',
  templateUrl: './group-template-demo.component.html',
  styleUrls: ['./group-template-demo.component.scss']
})
export class GroupTemplateDemoComponent extends GroupTemplateBaseComponent implements OnInit {
  groupItemDisplayFieldId = 'name';

  ngOnInit(): void {
  }

}
