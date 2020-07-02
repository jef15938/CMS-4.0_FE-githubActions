import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RenderComponent } from './global/component/render/render.component';

const routes: Routes = [
  {
    path: 'preview/:contentId', component: RenderComponent
  },
  {
    path: '**',
    redirectTo: 'preview/fake-content-id-need-modify-render-routing-module'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RenderRoutingModule { }
