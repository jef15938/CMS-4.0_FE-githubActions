import { Component, OnInit, Injector } from '@angular/core';
import { CommonTemplateBaseComponent } from '../../../function/wrapper/layout-base/common-template-base.component';
import { ContentTemplateInfo } from '../../interface/content-template-info.interface';

@Component({
  selector: 'rdr-icon-page',
  templateUrl: './icon-page.component.html',
  styleUrls: ['./icon-page.component.scss']
})
export class IconPageComponent extends CommonTemplateBaseComponent implements OnInit {
  defaultTemplateInfo: ContentTemplateInfo = {
    id: '',
    templateId: 'IconPage',
    fields: [],
    attributes: {},
  };

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit() {
  }

}
