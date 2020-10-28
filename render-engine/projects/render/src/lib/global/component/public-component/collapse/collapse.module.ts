import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxUiModule } from '@neux/ui';
import { AccordionComponent } from './accordion/accordion.component';
import { CollapseComponent } from './collapse/collapse.component';


@NgModule({
  declarations: [
    AccordionComponent,
    CollapseComponent
  ],
  imports: [
    CommonModule,
    NxUiModule
  ],
  exports: [
    AccordionComponent,
    CollapseComponent
  ]
})
export class CollapseModule { }
