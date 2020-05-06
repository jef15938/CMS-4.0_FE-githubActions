import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeptRoutingModule } from './dept-routing.module';
import { DeptComponent } from './dept.component';
import { DeptNodeComponent } from './component/dept-node/dept-node.component';
import { DeptMaintainModalComponent } from './component/dept-maintain-modal/dept-maintain-modal.component';
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
    DeptMaintainModalComponent
  ]
})
export class DeptModule { }
