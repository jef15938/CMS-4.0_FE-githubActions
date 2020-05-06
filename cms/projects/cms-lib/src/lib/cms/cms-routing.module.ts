import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CmsComponent } from './cms.component';
import { CmsUserMenuResolver } from './cms-menu-resolver';

const routes: Routes = [
  {
    path: '', component: CmsComponent, resolve: { menus: CmsUserMenuResolver },
    children: [
      {
        path: 'multiSite',
        loadChildren: () => import('./function-module/multi-site/multi-site.module').then(m => m.MultiSiteModule)
      },
      {
        path: 'MyAuditingReport',
        loadChildren: () => import('./function-module/my-auditing/my-auditing.module').then(m => m.MyAuditingModule)
      },
      {
        path: 'auditing',
        loadChildren: () => import('./function-module/auditing/auditing.module').then(m => m.AuditingModule)
      },
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
