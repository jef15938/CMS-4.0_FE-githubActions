import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { WebRoutingModule } from './web-routing.module';
import { WebComponent } from './component/web/web.component';
import { CorporateResponsibilityComponent } from './component/corporate-responsibility/corporate-responsibility.component';

@NgModule({
  declarations: [
    WebComponent,
    CorporateResponsibilityComponent,
  ],
  imports: [
    SharedModule,
    WebRoutingModule,
  ]
})
export class WebModule { }
