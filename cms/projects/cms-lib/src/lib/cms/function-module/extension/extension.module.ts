import { NgModule } from '@angular/core';
import { ExtensionRoutingModule } from './extension-routing.module';
import { ExtensionComponent } from './extension.component';

@NgModule({
  declarations: [ExtensionComponent],
  imports: [
    ExtensionRoutingModule
  ]
})
export class ExtensionModule { }
