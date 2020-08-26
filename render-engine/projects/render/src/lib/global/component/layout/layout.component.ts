import { Component, OnInit, Injector } from '@angular/core';
import { CommonTemplateBaseComponent } from '../../../function/wrapper';
import { LayoutInfo } from '../../interface/layout-info.interface';
import { SiteMapGetResponseModel } from '../../api/data-model/models/site-map-get-response.model';

@Component({
  selector: 'lib-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent extends CommonTemplateBaseComponent implements OnInit {
  defaultTemplateInfo: LayoutInfo;

  templateInfo: LayoutInfo;
  constructor(
    injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit(): void {

  }

  get siteMap(): SiteMapGetResponseModel {
    return this.templateInfo?.attributes?.sitemap;
  }

}
