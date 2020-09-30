import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NxUiModule } from '@neux/ui';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { RenderComponent } from './global/component/render/render.component';
import { WrapperModule } from './function/wrapper/wrapper.module';
import { PipeModule } from './global/pipe/pipe.module';
import { TabModule } from './global/component/public-component/tab/tab.module';
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
import { MegaMenuOldComponent } from './global/component/layout-full/mega-menu-old/mega-menu-old.component';
import { MobileMegaMenuComponent } from './global/component/layout-full/mobile-mega-menu/mobile-mega-menu.component';
import { QaComponent } from './global/component/qa/qa.component';
import { DownloadComponent } from './global/component/download/download.component';
import { HtmlComponent } from './global/component/html/html.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RenderEffects } from './global/store/effects/render.effects';
import * as fromRenderStore from './global/store/reducers/render.reducer';
import { FixedWrapperComponent } from './global/component/fixed-wrapper/fixed-wrapper.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorHandlerInterceptor } from './global/interceptor/http-error-handler.interceptor';
import { HtmlEditorContentComponent } from './function/ui/html-editor-content/html-editor-content.component';
import { RenderPreviewContainerComponent } from './global/component/render-preview-container/render-preview-container.component';
import { TestCustomize1Component } from './global/component/test-customize1/test-customize1.component';
import { MetaService } from './global/service/meta.service';
import { BannerComponent } from './global/component/banner/banner.component';
import { ListComponent } from './global/component/list/list.component';
import { CollapseComponent } from './global/component/public-component/collapse/collapse.component';
import { CardLinkFrameComponent } from './global/component/public-component/card-link-frame/card-link-frame.component';
import { CardLinkComponent } from './global/component/public-component/card-link/card-link.component';
import { CardNewsComponent } from './global/component/public-component/card-news/card-news.component';
import { CardActivityComponent } from './global/component/public-component/card-activity/card-activity.component';
import { CardJournalComponent } from './global/component/public-component/card-journal/card-journal.component';
import { PaginationComponent } from './global/component/public-component/pagination/pagination.component';
import { BreadcrumbComponent } from './global/component/public-component/breadcrumb/breadcrumb.component';
import { FormFrameComponent } from './global/component/public-component/form-frame/form-frame.component';
import { InputComponent } from './global/component/public-component/input/input.component';
import { SelectComponent } from './global/component/public-component/select/select.component';
import { RadioComponent } from './global/component/public-component/radio/radio.component';
import { CheckboxComponent } from './global/component/public-component/checkbox/checkbox.component';
import { SearchBarComponent } from './global/component/public-component/search-bar/search-bar.component';
import { FastToolComponent } from './global/component/public-component/fast-tool/fast-tool.component';
import { ButtonComponent } from './global/component/public-component/button/button.component';
import { MegaMenuComponent } from './global/component/public-component/mega-menu/mega-menu.component';
import { NewsListComponent } from './global/component/public-component/news-list/news-list.component';
import { FeatureBarComponent } from './global/component/public-component/feature-bar/feature-bar.component';
import { TabCarouselTemplateComponent } from './global/component/tab-carousel-template/tab-carousel-template.component';
import { TabScrollableTemplateComponent } from './global/component/tab-scrollable-template/tab-scrollable-template.component';

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
  FixedWrapperComponent,
  HtmlEditorContentComponent,
  BannerComponent,
  ListComponent,
  TestCustomize1Component,
  MegaMenuOldComponent,
];

const PUBLIC_COMPONENTS_TEMPLATES = [
  CollapseComponent,
  CardLinkFrameComponent,
  CardLinkComponent,
  CardNewsComponent,
  CardActivityComponent,
  CardJournalComponent,
  PaginationComponent,
  BreadcrumbComponent,
  InputComponent,
  FormFrameComponent,
  SelectComponent,
  RadioComponent,
  CheckboxComponent,
  SearchBarComponent,
  FastToolComponent,
  ButtonComponent,
  MegaMenuComponent,
  NewsListComponent,
  FeatureBarComponent,
  TabCarouselTemplateComponent,
  TabScrollableTemplateComponent,
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
    EffectsModule.forFeature([RenderEffects]),
    NxUiModule,
    FormsModule
  ],
  declarations: [
    RenderComponent,
    RenderPreviewContainerComponent,
    ...COMPONENTS,
    ...PUBLIC_COMPONENTS_TEMPLATES,
  ],
  exports: [
    RenderComponent,
    ...COMPONENTS,
    ...PUBLIC_COMPONENTS_TEMPLATES,
  ]
})
export class RenderModule {
  static forRoot(providers = []): ModuleWithProviders<RenderModule> {
    return {
      ngModule: RenderModule,
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandlerInterceptor, multi: true },
        { provide: RENDER_DEFAULT_COMPONENT_MAPPINGS_TOKEN, useValue: RENDER_DEFAULT_COMPONENT_MAPPINGS },
        MetaService,
      ]
    };
  }
}
