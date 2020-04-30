import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeptRoutingModule } from './dept-routing.module';
import { DeptComponent } from './dept.component';
import { TreeModule } from 'projects/cms-lib/src/lib/ui/tree/tree.module';
import { DeptListResolver } from './dept-list-resolver';
import { DeptNodeComponent } from './component/dept-node/dept-node.component';
import { MatMenuModule } from '@angular/material/menu';
import { DeptMaintainDialogComponent } from './component/dept-maintain-dialog/dept-maintain-dialog.component';
import { DialogModule } from 'projects/cms-lib/src/lib/ui/dialog/dialog.module';

const COMPONENTS = [
  DeptComponent,
  DeptNodeComponent,
]

@NgModule({
  imports: [
    CommonModule,
    DeptRoutingModule,
    TreeModule,
    MatMenuModule,
    DialogModule,
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
