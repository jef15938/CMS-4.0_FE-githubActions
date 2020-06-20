import { Component, OnInit } from '@angular/core';
import { TabTemplateBaseComponent } from '../../../wrapper/layout-base/tab-template-base.component';

@Component({
  selector: 'lib-tab-demo',
  templateUrl: './tab-demo.component.html',
  styleUrls: ['./tab-demo.component.scss'],
})
export class TabDemoComponent extends TabTemplateBaseComponent implements OnInit {
  maxItemCount = 3;
  ngOnInit() {
  }
}
