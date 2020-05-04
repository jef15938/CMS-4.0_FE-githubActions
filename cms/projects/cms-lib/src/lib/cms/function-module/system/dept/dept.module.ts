import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeptRoutingModule } from './dept-routing.module';
import { DeptComponent } from './dept.component';
import { DeptListResolver } from './dept-list-resolver';
import { DeptNodeComponent } from './component/dept-node/dept-node.component';
import { DeptMaintainDialogComponent } from './component/dept-maintain-dialog/dept-maintain-dialog.component';
import { SharedModule } from 'projects/cms-lib/src/lib/shared/shared.module';

const COMPONENTS = [
  DeptComponent,
  DeptNodeComponent,
]

@NgModule({
  imports: [
    CommonModule,
    DeptRoutingModule,
    SharedModule 
  ],
  declarations: [
    ...COMPONENTS,
    DeptMaintainDialogComponent
  ],
  providers: [
    DeptListResolver,
  ]

})
export class DeptModule { }
