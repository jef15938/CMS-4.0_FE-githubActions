import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorporateResponsibilityComponent } from './corporate-responsibility.component';

const routes: Routes = [
  {
    path: '', component: CorporateResponsibilityComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateResponsibilityRoutingModule { }
