import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RenderModule } from '@render';

const routes: Routes = [
  {
    path: 'render',
    loadChildren: () => Promise.resolve(RenderModule)
  },
  {
    path: '**',
    redirectTo: 'render'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
