import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeptRoutingModule } from './dept-routing.module';
import { DeptComponent } from './dept.component';
import { TreeModule } from 'projects/cms-lib/src/lib/ui/tree/tree.module';
import { DeptListResolver } from './dept-list-resolver';

@NgModule({
  imports: [
    CommonModule,
    DeptRoutingModule,
    TreeModule
  ],
  declarations: [DeptComponent],
  providers: [
    DeptListResolver,
  ]

})
export class DeptModule { }
