import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtensionRoutingModule } from './extension-routing.module';
import { ExtensionComponent } from './component/extension.component';
import { DynamicWrapperModule } from '@neux/core';

@NgModule({
  declarations: [ExtensionComponent],
  imports: [
    CommonModule,
    ExtensionRoutingModule,
    DynamicWrapperModule,
  ]
})
export class ExtensionModule { }
