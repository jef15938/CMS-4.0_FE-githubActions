import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MultiSiteRoutingModule } from './multi-site-routing.module';
import { MultiSiteComponent } from './multi-site.component';
import { SharedModule } from 'projects/cms-lib/src/lib/shared/shared.module';
import { MultiSiteNodeComponent } from './component/multi-site-node/multi-site-node.component';
import { SitemapEditComponent } from './component/sitemap-edit/sitemap-edit.component';


@NgModule({
  declarations: [
    MultiSiteComponent,
    MultiSiteNodeComponent,
    SitemapEditComponent,
  ],
  imports: [
    CommonModule,
    MultiSiteRoutingModule,
    SharedModule,
  ]
})
export class MultiSiteModule { }
