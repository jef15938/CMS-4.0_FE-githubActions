import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { RenderComponent } from './global/component/render/render.component';
import { WrapperModule } from './function/wrapper/wrapper.module';
import { PipeModule } from './global/pipe/pipe.module';
import { TabModule } from './global/component/tab/tab.module';
import { RenderRoutingModule } from './render-routing.module';
import { IconPageComponent, SliderComponent, FieldsDemoComponent, GroupTemplateDemoComponent, DataSourceDemoComponent } from './global/component';

const DEMO_COMPONENTS = [
  IconPageComponent,
  SliderComponent,
  FieldsDemoComponent,
  GroupTemplateDemoComponent,
  DataSourceDemoComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RenderRoutingModule,
    PipeModule,
    TabModule,
    WrapperModule,
    SwiperModule,
  ],
  declarations: [
    RenderComponent,
    ...DEMO_COMPONENTS,
  ],
  exports: [
    RenderComponent,
    ...DEMO_COMPONENTS,
  ]
})
export class RenderModule { }
