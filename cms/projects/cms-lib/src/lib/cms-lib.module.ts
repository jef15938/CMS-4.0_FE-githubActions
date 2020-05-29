import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { ApiCheckComponent } from './neuxAPI/api-check.component';

@NgModule({
  declarations: [
    ApiCheckComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    // ApiCheckComponent,
    // SharedModule
  ]
})
export class CmsLibModule { }
