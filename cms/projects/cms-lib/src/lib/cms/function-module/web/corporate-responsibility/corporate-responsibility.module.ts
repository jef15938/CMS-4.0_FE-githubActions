import { NgModule } from '@angular/core';
import { SharedModule } from '@cms-lib/shared/shared.module';
import { CorporateResponsibilityRoutingModule } from './corporate-responsibility-routing.module';
import { CorporateResponsibilityComponent } from './corporate-responsibility.component';

@NgModule({
  declarations: [CorporateResponsibilityComponent],
  imports: [
    SharedModule,
    CorporateResponsibilityRoutingModule,
  ]
})
export class CorporateResponsibilityModule { }
