import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiSiteRoutingModule } from './multi-site-routing.module';
import { MultiSiteComponent } from './multi-site.component';
import { SharedModule } from 'projects/cms-lib/src/lib/shared/shared.module';
import { MultiSiteNodeComponent } from './component/multi-site-node/multi-site-node.component';
import { SitemapNodeUpdateComponent } from './component/sitemap-node-update/sitemap-node-update.component';
import { SitemapNodeCreateModalComponent } from './component/sitemap-node-create-modal/sitemap-node-create-modal.component';

@NgModule({
  imports: [
    CommonModule,
    MultiSiteRoutingModule,
    SharedModule,
  ],
  declarations: [
    MultiSiteComponent,
    MultiSiteNodeComponent,
    SitemapNodeUpdateComponent,
    SitemapNodeCreateModalComponent,
  ],
})
export class MultiSiteModule { }
