import { Component, OnInit, Injector } from '@angular/core';
import { GroupTemplateBaseComponent } from '../../wrapper/layout-base/group-template-base.component';

@Component({
  selector: 'layoutlib-group-template-demo',
  templateUrl: './group-template-demo.component.html',
  styleUrls: ['./group-template-demo.component.scss']
})
export class GroupTemplateDemoComponent extends GroupTemplateBaseComponent implements OnInit {
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
