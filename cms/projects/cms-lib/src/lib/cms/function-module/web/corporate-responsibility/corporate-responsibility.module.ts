import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorporateResponsibilityRoutingModule } from './corporate-responsibility-routing.module';
import { CorporateResponsibilityComponent } from './corporate-responsibility.component';


@NgModule({
  declarations: [CorporateResponsibilityComponent],
  imports: [
    CommonModule,
    CorporateResponsibilityRoutingModule
  ]
})
export class CorporateResponsibilityModule { }
