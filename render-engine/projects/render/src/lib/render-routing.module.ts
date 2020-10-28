import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RenderComponent } from './global/component/render/render.component';
import { PageInfoResolverService } from './global/service/page-info-resolver.service';
import { RenderPreviewComponent } from './global/component/render-preview/render-preview.component';

const routes: Routes = [
  {
    path: 'preview',
    children: [
      {
        path: 'iframe/:pageID', component: RenderComponent, // preview，放前面才不會被當作是 :pageID/:languageID
        data: { context: 'preview' },
        resolve: {
          data: PageInfoResolverService
        }
      },
      {
        path: 'iframe/:languageID/:pageID', component: RenderComponent, // preview
        data: { context: 'preview' },
        resolve: {
          data: PageInfoResolverService
        }
      },
      {
        path: ':pageID', component: RenderPreviewComponent, // preview，放前面才不會被當作是 :pageID/:languageID
        data: { context: 'preview' },
      },
      {
        path: ':languageID/:pageID', component: RenderPreviewComponent, // preview
        data: { context: 'preview' },
      },
    ]
  },
  // {
  //   path: 'preview/:pageID', component: RenderComponent, // preview，放前面才不會被當作是 :pageID/:languageID
  //   data: { context: 'preview' },
  //   resolve: {
  //     data: PageInfoResolverService
  //   }
  // },
  // {
  //   path: 'preview/:languageID/:pageID', component: RenderComponent, // preview
  //   data: { context: 'preview' },
  //   resolve: {
  //     data: PageInfoResolverService
  //   }
  // },
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
