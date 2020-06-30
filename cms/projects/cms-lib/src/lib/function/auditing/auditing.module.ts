import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuditingRoutingModule } from './auditing-routing.module';
import { AuditingComponent } from './auditing.component';
import { AuditingActionCellComponent } from './component/cell-renderer/auditing-action-cell/auditing-action-cell.component';
import { ApproveAuditingModalComponent } from './component/modal/approve-auditing-modal/approve-auditing-modal.component';

@NgModule({
  imports: [
    SharedModule,
    AuditingRoutingModule,
  ],
  declarations: [
    AuditingComponent,
    AuditingActionCellComponent,
    ApproveAuditingModalComponent,
  ],
})
export class AuditingModule { }
