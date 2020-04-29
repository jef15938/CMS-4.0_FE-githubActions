import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeptComponent } from './dept.component';
import { DeptListResolver } from './dept-list-resolver';

const routes: Routes = [
  {
    path: '', component: DeptComponent, resolve: { depts: DeptListResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeptRoutingModule { }
