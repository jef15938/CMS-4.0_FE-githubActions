import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebComponent } from './component/web/web.component';
import { CorporateResponsibilityComponent } from './component/corporate-responsibility/corporate-responsibility.component';

const routes: Routes = [
  {
    path: '', component: WebComponent,
    children: [
      {
        path: 'corporate-responsibility', component: CorporateResponsibilityComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
