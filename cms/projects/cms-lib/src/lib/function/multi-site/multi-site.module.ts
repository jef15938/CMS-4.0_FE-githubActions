import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MultiSiteRoutingModule } from './multi-site-routing.module';
import { MultiSiteComponent } from './component/multi-site/multi-site.component';
import { MultiSiteNodeComponent } from './component/multi-site-node/multi-site-node.component';
import { SitemapNodeDetailComponent } from './component/sitemap-node-detail/sitemap-node-detail.component';
import { SitemapNodeCreateModalComponent } from './component/sitemap-node-create-modal/sitemap-node-create-modal.component';
import { AuditingSitemapModalComponent } from './component/auditing-sitemap-modal/auditing-sitemap-modal.component';
import { GetLayoutByLayoutIDPipe } from './pipe/get-layout-by-layout-id.pipe';

@NgModule({
  imports: [
    SharedModule,
    MultiSiteRoutingModule,
  ],
  declarations: [
    MultiSiteComponent,
    MultiSiteNodeComponent,
    SitemapNodeDetailComponent,
    SitemapNodeCreateModalComponent,
    AuditingSitemapModalComponent,
    GetLayoutByLayoutIDPipe,
  ],
})
export class MultiSiteModule { }
