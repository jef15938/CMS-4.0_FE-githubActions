import { Component, OnInit, Injector } from '@angular/core';
import { CommonTemplateBaseComponent } from '../../wrapper/layout-base/common-template-base.component';

@Component({
  selector: 'layoutlib-fields-demo',
  templateUrl: './fields-demo.component.html',
  styleUrls: ['./fields-demo.component.scss']
})
export class FieldsDemoComponent extends CommonTemplateBaseComponent implements OnInit {

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit(): void {
  }

}
