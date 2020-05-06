import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditingRoutingModule } from './auditing-routing.module';
import { AuditingComponent } from './auditing.component';
import { SharedModule } from 'projects/cms-lib/src/lib/shared/shared.module';
import { AuditingActionCellComponent } from './component/cell-renderer/auditing-action-cell/auditing-action-cell.component';
import { ApproveAuditingModalComponent } from './component/modal/approve-auditing-modal/approve-auditing-modal.component';

@NgModule({
  imports: [
    CommonModule,
    AuditingRoutingModule,
    SharedModule,
  ],
  declarations: [
    AuditingComponent,
    AuditingActionCellComponent,
    ApproveAuditingModalComponent,
  ],
})
export class AuditingModule { }
