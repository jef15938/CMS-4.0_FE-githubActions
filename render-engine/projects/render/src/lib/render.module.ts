import { NgModule } from '@angular/core';
import { RenderComponent } from './components/render/render.component';
import { WrapperModule } from '@layout';
import { CommonModule } from '@angular/common';
import { RenderRoutingModule } from './render-routing.module';

@NgModule({
  declarations: [RenderComponent],
  imports: [
    CommonModule,
    RenderRoutingModule,
    WrapperModule
  ],
  exports: [RenderComponent]
})
export class RenderModule { }
