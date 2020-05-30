import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiSiteRoutingModule } from './multi-site-routing.module';
import { MultiSiteComponent } from './multi-site.component';
import { SharedModule } from './../../../shared/shared.module';
import { MultiSiteNodeComponent } from './component/multi-site-node/multi-site-node.component';
import { SitemapNodeUpdateComponent } from './component/sitemap-node-update/sitemap-node-update.component';
import { SitemapNodeCreateModalComponent } from './component/sitemap-node-create-modal/sitemap-node-create-modal.component';
import { ContentEditorModule } from '../../../ui/content-editor/content-editor.module';
import { GetStartEndTimePipe } from './pipe/get-start-end-time.pipe';
import { HtmlEditorModule } from '../../../ui/html-editor/html-editor.module';

@NgModule({
  imports: [
    CommonModule,
    MultiSiteRoutingModule,
    SharedModule,
    ContentEditorModule,
    HtmlEditorModule,
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
