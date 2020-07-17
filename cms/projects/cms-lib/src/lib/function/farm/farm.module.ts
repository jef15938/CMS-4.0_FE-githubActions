import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FarmRoutingModule } from './farm-routing.module';
import { FarmComponent } from './farm.component';


@NgModule({
  declarations: [FarmComponent],
  imports: [
    CommonModule,
    FarmRoutingModule
  ]
})
export class FarmModule { }
