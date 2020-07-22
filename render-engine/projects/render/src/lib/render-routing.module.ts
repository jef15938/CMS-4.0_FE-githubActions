import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RenderComponent } from './global/component/render/render.component';

const routes: Routes = [
  {
    path: ':contentID', component: RenderComponent // runtime
  },
  {
    path: ':contentID/:languageID', component: RenderComponent // runtime
  },
  {
    path: 'preview/:contentID', component: RenderComponent // preview
  },
  {
    path: 'preview/:contentID/:languageID', component: RenderComponent // preview
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
