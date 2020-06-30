import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuditingRoutingModule } from './auditing-routing.module';
import { AuditingComponent } from './component/auditing/auditing.component';
import { AuditingActionCellComponent } from './component/auditing-action-cell/auditing-action-cell.component';
import { ApproveAuditingModalComponent } from './component/approve-auditing-modal/approve-auditing-modal.component';

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
