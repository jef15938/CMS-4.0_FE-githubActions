import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MultiSiteRoutingModule } from './multi-site-routing.module';
import { MultiSiteComponent } from './multi-site.component';
import { MultiSiteNodeComponent } from './component/multi-site-node/multi-site-node.component';
import { SitemapNodeUpdateComponent } from './component/sitemap-node-update/sitemap-node-update.component';
import { SitemapNodeCreateModalComponent } from './component/sitemap-node-create-modal/sitemap-node-create-modal.component';
import { GetStartEndTimePipe } from './pipe/get-start-end-time.pipe';

@NgModule({
  imports: [
    SharedModule,
    MultiSiteRoutingModule,
  ],
  declarations: [
    MultiSiteComponent,
    MultiSiteNodeComponent,
    SitemapNodeUpdateComponent,
    SitemapNodeCreateModalComponent,
    GetStartEndTimePipe,
  ],
})
export class MultiSiteModule { }
