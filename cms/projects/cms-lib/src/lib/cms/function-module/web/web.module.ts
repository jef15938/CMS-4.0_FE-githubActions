import { NgModule } from '@angular/core';
import { SharedModule } from '@cms-lib/shared/shared.module';
import { WebRoutingModule } from './web-routing.module';
import { WebComponent } from './web.component';

@NgModule({
  declarations: [WebComponent],
  imports: [
    SharedModule,
    WebRoutingModule,
  ]
})
export class WebModule { }
