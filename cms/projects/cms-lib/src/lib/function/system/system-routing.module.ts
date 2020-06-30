import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemComponent } from './system.component';
import { DeptModule } from './dept/dept.module';

export function getDeptModule() { return DeptModule; }

const routes: Routes = [
  {
    path: '', component: SystemComponent,
    children: [
      {
        path: 'dept',
        // loadChildren: () => import('./dept/dept.module').then(m => m.DeptModule)
        loadChildren: getDeptModule
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
