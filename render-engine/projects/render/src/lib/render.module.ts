import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { RenderComponent } from './global/component/render/render.component';
import { WrapperModule } from './function/wrapper/wrapper.module';
import { PipeModule } from './global/pipe/pipe.module';
import { TabModule } from './global/component/tab/tab.module';
import { RenderRoutingModule } from './render-routing.module';
import { IconPageComponent } from './global/component/icon-page/icon-page.component';
import { SliderComponent } from './global/component/slider/slider.component';
import { FieldsDemoComponent } from './global/component/fields-demo/fields-demo.component';
import { GroupTemplateDemoComponent } from './global/component/group-template-demo/group-template-demo.component';
import { DataSourceDemoComponent } from './global/component/data-source-demo/data-source-demo.component';

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
