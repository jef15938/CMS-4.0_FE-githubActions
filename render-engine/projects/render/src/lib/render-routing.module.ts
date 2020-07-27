import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RenderComponent } from './global/component/render/render.component';
import { PageInfoResolverService } from './global/service/page-info-resolver.service';

const routes: Routes = [
  {
    path: ':pageID', component: RenderComponent, // runtime
    resolve: {
      data: PageInfoResolverService
    }
  },
  {
    path: ':pageID/:languageID', component: RenderComponent, // runtime
    resolve: {
      data: PageInfoResolverService
    }
  },
  {
    path: 'preview/:pageID', component: RenderComponent, // preview
    resolve: {
      data: PageInfoResolverService
    }
  },
  {
    path: 'preview/:pageID/:languageID', component: RenderComponent, // preview
    resolve: {
      data: PageInfoResolverService
    }
  },
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
