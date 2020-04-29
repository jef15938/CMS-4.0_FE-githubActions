import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemComponent } from './system.component';
import { DeptComponent } from './dept/dept.component';


const routes: Routes = [
  {
    path: '', component: SystemComponent,
    children: [
      {
        path: 'dept',
        loadChildren: () => import('./dept/dept.module').then(m => m.DeptModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
