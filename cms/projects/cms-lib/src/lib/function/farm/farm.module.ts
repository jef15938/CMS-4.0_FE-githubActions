import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FarmRoutingModule } from './farm-routing.module';
import { FarmComponent } from './farm.component';

@NgModule({
  declarations: [FarmComponent],
  imports: [
    SharedModule,
    FarmRoutingModule,
  ]
})
export class FarmModule { }
