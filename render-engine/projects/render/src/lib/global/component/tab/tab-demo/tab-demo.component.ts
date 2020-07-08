import { Component, OnInit, Injector } from '@angular/core';
import { TabTemplateBaseComponent } from '../../../../function/wrapper/layout-base/tab-template-base.component';

@Component({
  selector: 'rdr-tab-demo',
  templateUrl: './tab-demo.component.html',
  styleUrls: ['./tab-demo.component.scss'],
})
export class TabDemoComponent extends TabTemplateBaseComponent implements OnInit {
  maxItemCount = 3;

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit() {
  }
}
