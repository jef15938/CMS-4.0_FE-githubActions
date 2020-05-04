import { NgModule } from '@angular/core';
import { RenderComponent } from './components/render/render.component';
import { LayoutModule } from '@layout';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [RenderComponent],
  imports: [
    CommonModule,
    LayoutModule
  ],
  exports: [RenderComponent]
})
export class RenderModule { }
