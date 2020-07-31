import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RenderComponent } from './global/component/render/render.component';
import { PageInfoResolverService } from './global/service/page-info-resolver.service';

const routes: Routes = [
  {
    path: 'preview/:pageID', component: RenderComponent, // preview，放前面才不會被當作是 :pageID/:languageID
    data: { context: 'preview' },
    resolve: {
      data: PageInfoResolverService
    }
  },
  {
    path: 'preview/:pageID/:languageID', component: RenderComponent, // preview
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
    path: ':pageID/:languageID', component: RenderComponent, // runtime
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
