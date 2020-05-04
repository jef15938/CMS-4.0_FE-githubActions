import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutWrapperComponent } from './layout-wrapper/layout-wrapper.component';



@NgModule({
  declarations: [LayoutWrapperComponent],
  imports: [
    CommonModule
  ],
  exports: [LayoutWrapperComponent]
})
export class LayoutBaseModule { }
