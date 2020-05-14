import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutWrapperComponent } from './layout-wrapper/layout-wrapper.component';
import { TemplateFieldDirective } from './layout-wrapper/template-field.directive';
import { TemplatesContainerComponent } from './templates-container/templates-container.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LayoutWrapperComponent,
    TemplateFieldDirective,
    TemplatesContainerComponent,
  ],
  exports: [
    TemplateFieldDirective,
    TemplatesContainerComponent,
  ]
})
export class WrapperModule { }