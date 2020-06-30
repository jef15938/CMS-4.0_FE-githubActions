import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyAuditingComponent } from './my-auditing.component';

const routes: Routes = [
  {
    path: '', component: MyAuditingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAuditingRoutingModule { }
