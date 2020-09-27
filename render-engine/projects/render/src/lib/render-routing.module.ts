import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RenderComponent } from './global/component/render/render.component';
import { PageInfoResolverService } from './global/service/page-info-resolver.service';
import { ComponentsOverviewComponent } from './global/component/public-component/components-overview/components-overview.component';
import { IndexComponent } from './global/component/public-layout/index/index.component';

const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'overview',
    component: ComponentsOverviewComponent
  },
  {
    path: 'preview/:pageID', component: RenderComponent, // preview，放前面才不會被當作是 :pageID/:languageID
    data: { context: 'preview' },
    resolve: {
      data: PageInfoResolverService
    }
  },
  {
    path: 'preview/:languageID/:pageID', component: RenderComponent, // preview
    data: { context: 'preview' },
    resolve: {
      data: PageInfoResolverService
    }
  },
  {
    path: ':pageID', component: RenderComponent, // runtime
    data: { context: 'runtime' },
    resolve: {
      data: PageInfoResolverService
    }
  },
  {
    path: ':languageID/:pageID', component: RenderComponent, // runtime
    data: { context: 'runtime' },
    resolve: {
      data: PageInfoResolverService
    }
  },
  {
    path: '**',
    redirectTo: 'error'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RenderRoutingModule { }
