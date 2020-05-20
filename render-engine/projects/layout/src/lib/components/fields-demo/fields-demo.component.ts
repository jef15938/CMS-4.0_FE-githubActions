import { Component, OnInit } from '@angular/core';
import { CommonTemplateBaseComponent } from '../../wrapper/layout-base/common-template-base.component';

@Component({
  selector: 'lib-fields-demo',
  templateUrl: './fields-demo.component.html',
  styleUrls: ['./fields-demo.component.scss']
})
export class FieldsDemoComponent extends CommonTemplateBaseComponent implements OnInit {

  ngOnInit(): void {
  }

}
