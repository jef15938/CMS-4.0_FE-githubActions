import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicWrapperComponent } from './component/dynamic-wrapper/dynamic-wrapper.component';
import { DynamicWrapperDirective } from './directive/dynamic-wrapper.directive';

@NgModule({
  declarations: [DynamicWrapperComponent, DynamicWrapperDirective],
  imports: [CommonModule],
  exports: [DynamicWrapperComponent, DynamicWrapperDirective],
})
export class DynamicWrapperModule { }
