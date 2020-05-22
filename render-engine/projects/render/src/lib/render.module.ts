import { NgModule } from '@angular/core';
import { RenderComponent } from './components/render/render.component';
import { LayoutModule } from '@layout';
import { CommonModule } from '@angular/common';
import { RenderRoutingModule } from './render-routing.module';

@NgModule({
  declarations: [RenderComponent],
  imports: [
    CommonModule,
    RenderRoutingModule,
    LayoutModule
  ],
  exports: [RenderComponent]
})
export class RenderModule { }
