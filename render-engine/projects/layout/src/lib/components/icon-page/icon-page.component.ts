import { Component, OnInit, Injector } from '@angular/core';
import { CommonTemplateBaseComponent } from '../../wrapper/layout-base/common-template-base.component';

@Component({
  selector: 'layoutlib-icon-page',
  templateUrl: './icon-page.component.html',
  styleUrls: ['./icon-page.component.scss']
})
export class IconPageComponent extends CommonTemplateBaseComponent implements OnInit {

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit() {
  }

}
