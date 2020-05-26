import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorporateResponsibilityRoutingModule } from './corporate-responsibility-routing.module';
import { CorporateResponsibilityComponent } from './corporate-responsibility.component';
import { FarmModule } from 'projects/cms-lib/src/lib/ui/farm/farm.module';


@NgModule({
  declarations: [CorporateResponsibilityComponent],
  imports: [
    CommonModule,
    CorporateResponsibilityRoutingModule,
    FarmModule,
  ]
})
export class CorporateResponsibilityModule { }
