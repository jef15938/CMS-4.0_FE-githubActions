import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemComponent } from './component/system/system.component';
import { DeptComponent } from './component/dept/dept.component';

const routes: Routes = [
  {
    path: '', component: SystemComponent,
    children: [
      {
        path: 'dept', component: DeptComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
