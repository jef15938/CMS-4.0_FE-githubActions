import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RenderComponent } from './global/component/render/render.component';
import { PageInfoResolverService } from './global/service/page-info-resolver.service';
import { RenderPreviewComponent } from './global/component/render-preview/render-preview.component';
import { DynamicPageInfoResolverService } from './global/service/dynamic-page-info-resolver.service';

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
        path: 'iframe/:funcID/:category/:dataID', component: RenderComponent, // preview
        data: { context: 'preview' },
        resolve: {
          data: DynamicPageInfoResolverService
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
      {
        path: ':funcID/:category/:dataID', component: RenderPreviewComponent, // preview
        data: { context: 'preview' },
      },
    ]
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
    path: ':funcID/:category/:dataID', component: RenderComponent, // runtime
    data: { context: 'runtime' },
    resolve: {
      data: DynamicPageInfoResolverService
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
