import { Component, OnInit, Injector } from '@angular/core';
import { CommonTemplateBaseComponent } from '../../../function/wrapper';
import { ContentTemplateInfo, SitemapNode } from '../../interface';
import { LayoutInfo } from '../../interface/layout-info.interface';

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

  get siteMap(): SitemapNode {
    return this.templateInfo?.attributes?.sitemap;
  }

}
