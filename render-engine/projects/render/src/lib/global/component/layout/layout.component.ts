import { Component, Injector } from '@angular/core';
import { LayoutInfo } from '../../interface/layout-info.interface';
import { SiteMapGetResponseModel } from '../../api/data-model/models/site-map-get-response.model';
import { CommonTemplateBaseComponent } from '../../../function/wrapper/template-base/common-template-base.component';

const TEMPLATE_ID = 'layout';

@Component({
  selector: 'rdr-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent extends CommonTemplateBaseComponent {
  defaultTemplateInfo: LayoutInfo;

  templateInfo: LayoutInfo;

  constructor(injector: Injector) { super(injector, TEMPLATE_ID); }

  get siteMap(): SiteMapGetResponseModel {
    return this.templateInfo?.attributes?.sitemap;
  }

}
