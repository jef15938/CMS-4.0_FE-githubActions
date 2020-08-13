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
import { NewsComponent } from './global/component/news/news.component';
import { RENDER_DEFAULT_COMPONENT_MAPPINGS_TOKEN } from './global/injection-token/injection-token';
import { RENDER_DEFAULT_COMPONENT_MAPPINGS } from './global/const/component-mapping';
import { LayoutComponent } from './global/component/layout/layout.component';
import { LayoutFullComponent } from './global/component/layout-full/layout-full.component';
import { MegaMenuComponent } from './global/component/layout-full/mega-menu/mega-menu.component';
import { MobileMegaMenuComponent } from './global/component/layout-full/mobile-mega-menu/mobile-mega-menu.component';
import { QaComponent } from './global/component/qa/qa.component';
import { DownloadComponent } from './global/component/download/download.component';
import { HtmlComponent } from './global/component/html/html.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RenderEffects } from './global/store/effects/render.effects';
import * as fromRenderStore from './global/store/reducers/render.reducer';

const COMPONENTS = [
  SliderComponent,
  NewsComponent,
  QaComponent,
  DownloadComponent,
  IconPageComponent,
  FieldsDemoComponent,
  GroupTemplateDemoComponent,
  LayoutFullComponent,
  MegaMenuComponent,
  MobileMegaMenuComponent,
  LayoutComponent,
  HtmlComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RenderRoutingModule,
    PipeModule,
    TabModule,
    WrapperModule,
    SwiperModule,
    StoreModule.forFeature(fromRenderStore.renderFeatureKey, fromRenderStore.reducer),
    EffectsModule.forFeature([RenderEffects])
  ],
  declarations: [
    RenderComponent,
    ...COMPONENTS,

  ],
  exports: [
    RenderComponent,
    ...COMPONENTS,
  ]
})
export class RenderModule {
  static forRoot(providers = []): ModuleWithProviders<RenderModule> {
    return {
      ngModule: RenderModule,
      providers: [
        { provide: RENDER_DEFAULT_COMPONENT_MAPPINGS_TOKEN, useValue: RENDER_DEFAULT_COMPONENT_MAPPINGS }
      ]
    };
  }
}
