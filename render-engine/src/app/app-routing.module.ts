import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'render',
    loadChildren: () => import('@render').then(m => m.RenderModule)
    // loadChildren: () => Promise.resolve(RenderModule)
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
