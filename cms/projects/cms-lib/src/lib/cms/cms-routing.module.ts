import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CmsComponent } from './cms.component';
import { CmsUserMenuResolver } from './cms-menu-resolver';

const routes: Routes = [
  {
    path: '', component: CmsComponent, resolve: { menus: CmsUserMenuResolver },
    children: [
      {
        path: 'system',
        loadChildren: () => import('./function-module/system/system.module').then(m => m.SystemModule)
      }
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }
