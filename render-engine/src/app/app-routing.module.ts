import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ErrorPageComponent } from './global/component/error-page/error-page.component';

const routes: Routes = [
  {
    path: 'error-page',
    component: ErrorPageComponent
  },
  {
    path: '',
    loadChildren: () => import('@neux/render').then(m => m.RenderModule)
    // loadChildren: () => Promise.resolve(RenderModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    preloadingStrategy: PreloadAllModules,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
