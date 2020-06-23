import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtensionRoutingModule } from './extension-routing.module';
import { ExtensionComponent } from './extension.component';

@NgModule({
  declarations: [ExtensionComponent],
  imports: [
    CommonModule,
    ExtensionRoutingModule
  ]
})
export class ExtensionModule { }
