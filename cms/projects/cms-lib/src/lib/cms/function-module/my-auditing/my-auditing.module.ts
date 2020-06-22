import { NgModule } from '@angular/core';
import { SharedModule } from '@cms-lib/shared/shared.module';
import { MyAuditingRoutingModule } from './my-auditing-routing.module';
import { MyAuditingComponent } from './my-auditing.component';
import { MyAuditingActionCellComponent } from './component/cell-renderer/my-auditing-action-cell/my-auditing-action-cell.component';
import { MyAuditingDetailModalComponent } from './component/modal/my-auditing-detail-modal/my-auditing-detail-modal.component';

@NgModule({
  imports: [
    SharedModule,
    MyAuditingRoutingModule,
  ],
  declarations: [
    MyAuditingComponent,
    MyAuditingActionCellComponent,
    MyAuditingDetailModalComponent
  ],
})
export class MyAuditingModule { }
