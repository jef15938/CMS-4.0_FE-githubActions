import { NgModule, ModuleWithProviders } from '@angular/core';
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
import { RENDER_DEFAULT_COMPONENT_MAPPING_TOKEN } from './global/injection-token/injection-token';
import { RENDER_DEFAULT_COMPONENT_MAPPINGS } from './global/const/component-mapping';

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
export class RenderModule {
  static forRoot(providers = []): ModuleWithProviders<RenderModule> {
    return {
      ngModule: RenderModule,
      providers: [
        { provide: RENDER_DEFAULT_COMPONENT_MAPPING_TOKEN, useValue: RENDER_DEFAULT_COMPONENT_MAPPINGS }
      ]
    };
  }
}
