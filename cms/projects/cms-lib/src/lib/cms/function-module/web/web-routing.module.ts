import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebComponent } from './web.component';

const routes: Routes = [
  {
    path: '', component: WebComponent,
    children: [
      {
        path: 'corporate-responsibility',
        loadChildren: () => import('./corporate-responsibility/corporate-responsibility.module').then(m => m.CorporateResponsibilityModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
