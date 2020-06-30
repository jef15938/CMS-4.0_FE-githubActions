import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DeptRoutingModule } from './dept-routing.module';
import { DeptComponent } from './dept.component';
import { DeptNodeComponent } from './component/dept-node/dept-node.component';
import { DeptMaintainModalComponent } from './component/dept-maintain-modal/dept-maintain-modal.component';

const COMPONENTS = [
  DeptComponent,
  DeptNodeComponent,
];

@NgModule({
  imports: [
    DeptRoutingModule,
    SharedModule
  ],
  declarations: [
    ...COMPONENTS,
    DeptMaintainModalComponent
  ]
})
export class DeptModule { }
