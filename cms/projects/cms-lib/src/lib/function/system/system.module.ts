import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './component/system/system.component';
import { DeptComponent } from './component/dept/dept.component';
import { DeptNodeComponent } from './component/dept-node/dept-node.component';
import { DeptMaintainModalComponent } from './component/dept-maintain-modal/dept-maintain-modal.component';

@NgModule({
  declarations: [
    SystemComponent,
    DeptComponent,
    DeptNodeComponent,
    DeptMaintainModalComponent,
  ],
  imports: [
    SharedModule,
    SystemRoutingModule
  ]
})
export class SystemModule { }
