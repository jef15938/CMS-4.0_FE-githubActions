import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAuditingRoutingModule } from './my-auditing-routing.module';
import { MyAuditingComponent } from './my-auditing.component';
import { SharedModule } from 'projects/cms-lib/src/lib/shared/shared.module';

@NgModule({
  declarations: [MyAuditingComponent],
  imports: [
    CommonModule,
    MyAuditingRoutingModule,
    SharedModule,
  ]
})
export class MyAuditingModule { }
