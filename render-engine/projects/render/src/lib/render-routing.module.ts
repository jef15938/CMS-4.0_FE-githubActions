import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RenderComponent } from './global/component/render/render.component';
import { TemplateInfoResolverService } from './global/service/template-info-resolver.service';
import { SitemapResolverService } from './global/service/sitemap-resolver.service';

const routes: Routes = [
  {
    path: ':pageID', component: RenderComponent, // runtime
    resolve: {
      pageInfo: TemplateInfoResolverService,
      sitemap: SitemapResolverService
    }
  },
  // {
  //   path: ':pageID/:languageID', component: RenderComponent, // runtime
  //   resolve: {
  //     pageInfo: TemplateInfoResolverService,
  //     sitemap: SitemapResolverService
  //   }
  // },
  {
    path: 'preview/:pageID', component: RenderComponent, // preview
    resolve: {
      pageInfo: TemplateInfoResolverService,
      sitemap: SitemapResolverService
    }
  },
  // {
  //   path: 'preview/:pageID/:languageID', component: RenderComponent, // preview
  //   resolve: {
  //     pageInfo: TemplateInfoResolverService,
  //     sitemap: SitemapResolverService
  //   }
  // },
  {
    path: '**',
    redirectTo: 'need-to-change-to-home-router-when-finishing-developing'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RenderRoutingModule { }
