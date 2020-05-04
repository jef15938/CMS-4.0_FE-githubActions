import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MultiSiteRoutingModule } from './multi-site-routing.module';
import { MultiSiteComponent } from './multi-site.component';
import { SharedModule } from 'projects/cms-lib/src/lib/shared/shared.module';


@NgModule({
  declarations: [MultiSiteComponent],
  imports: [
    CommonModule,
    MultiSiteRoutingModule,
    SharedModule
  ]
})
export class MultiSiteModule { }
