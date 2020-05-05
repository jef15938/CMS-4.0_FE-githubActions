import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAuditingRoutingModule } from './my-auditing-routing.module';
import { MyAuditingComponent } from './my-auditing.component';
import { SharedModule } from 'projects/cms-lib/src/lib/shared/shared.module';
import { MyAuditingActionCellComponent } from './component/cell-renderer/my-auditing-action-cell/my-auditing-action-cell.component';
import { MyAuditingDetailDialogComponent } from './component/dialog/my-auditing-detail-dialog/my-auditing-detail-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MyAuditingRoutingModule,
    SharedModule,
  ],
  declarations: [
    MyAuditingComponent,
    MyAuditingActionCellComponent,
    MyAuditingDetailDialogComponent
  ],
})
export class MyAuditingModule { }
