import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NxUiModule } from '@neux/ui';
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
import { FixedWrapperComponent } from './global/component/fixed-wrapper/fixed-wrapper.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorHandlerInterceptor } from './global/interceptor/http-error-handler.interceptor';
import { HtmlEditorContentComponent } from './function/ui/html-editor-content/html-editor-content.component';
import { BannerComponent } from './global/component/banner/banner.component';
import { ListComponent } from './global/component/list/list.component';
import { CollapseComponent } from './global/component/public-component/collapse/collapse.component';
import { BreadcrumbComponent } from './global/component/public-component/breadcrumb/breadcrumb.component';
import { CardLinkComponent } from './global/component/public-component/card-link/card-link.component';
import { CardNewsComponent } from './global/component/public-component/card-news/card-news.component';
import { ComponentsOverviewComponent } from './global/component/public-component/components-overview/components-overview.component';
import { CardLinkFrameComponent } from './global/component/public-component/card-link-frame/card-link-frame.component';
import { CardActivityComponent } from './global/component/public-component/card-activity/card-activity.component';
import { CardJournalComponent } from './global/component/public-component/card-journal/card-journal.component';
import { TlTabItemComponent } from './global/component/public-component/tab-item/tab-item.component';
import { TabScrollableComponent } from './global/component/public-component/tab-scrollable/tab-scrollable.component';
import { TabScrollFrameComponent } from './global/component/public-component/tab-scroll-frame/tab-scroll-frame.component';
import { TabCarouselFrameComponent } from './global/component/public-component/tab-carousel-frame/tab-carousel-frame.component';
import { TabCarouselComponent } from './global/component/public-component/tab-carousel/tab-carousel.component';
import { InputComponent } from './global/component/public-component/input/input.component';
import { FormFrameComponent } from './global/component/public-component/form-frame/form-frame.component';
import { SelectComponent } from './global/component/public-component/select/select.component';
import { RadioComponent } from './global/component/public-component/radio/radio.component';
import { CheckboxComponent } from './global/component/public-component/checkbox/checkbox.component';
import { SearchBarComponent } from './global/component/public-component/search-bar/search-bar.component';
import { FastToolComponent } from './global/component/public-component/fast-tool/fast-tool.component';
import { ButtonComponent } from './global/component/public-component/button/button.component';
import { PaginationComponent } from './global/component/public-component/pagination/pagination.component';
import { MonthlyPaymentCalculationComponent } from './global/component/public-component/monthly-payment-calculation/monthly-payment-calculation.component';
import { PolicyloanCalculationComponent } from './global/component/public-component/policyloan-calculation/policyloan-calculation.component';
import { IndexComponent } from './global/component/public-layout/index/index.component';
import { IndexSliderComponent } from './global/component/public-template/index-slider/index-slider.component';
import { IndexExploreComponent } from './global/component/public-template/index-explore/index-explore.component';
import { IndexProductSearchComponent } from './global/component/public-template/index-product-search/index-product-search.component';
import { IndexConsultantComponent } from './global/component/public-template/index-consultant/index-consultant.component';
import { IndexActivityComponent } from './global/component/public-template/index-activity/index-activity.component';
import { IndexNewsComponent } from './global/component/public-template/index-news/index-news.component';
import { HeaderComponent } from './global/component/public-component/header/header.component';
import { FooterComponent } from './global/component/public-component/footer/footer.component';
import { TlMegaMenuComponent } from './global/component/public-component/mega-menu/mega-menu.component';
import { NewsListComponent } from './global/component/public-component/news-list/news-list.component';
import { FeatureBarComponent } from './global/component/public-component/feature-bar/feature-bar.component';


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
  CollapseComponent,
  BreadcrumbComponent,
  CardLinkComponent,
  CardNewsComponent,
  ComponentsOverviewComponent,
  CardLinkFrameComponent,
  CardActivityComponent,
  CardJournalComponent,
  TlTabItemComponent,
  TabScrollableComponent,
  TabScrollFrameComponent,
  TabCarouselFrameComponent,
  TabCarouselComponent,
  InputComponent,
  FormFrameComponent,
  SelectComponent,
  RadioComponent,
  CheckboxComponent,
  SearchBarComponent,
  FastToolComponent,
  ButtonComponent,
  PaginationComponent,
  MonthlyPaymentCalculationComponent,
  PolicyloanCalculationComponent,
  IndexComponent,
  IndexSliderComponent,
  IndexExploreComponent,
  IndexProductSearchComponent,
  IndexConsultantComponent,
  IndexActivityComponent,
  IndexNewsComponent,
  HeaderComponent,
  FooterComponent,
  TlMegaMenuComponent,
  NewsListComponent,
  FeatureBarComponent,
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
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandlerInterceptor, multi: true },
        { provide: RENDER_DEFAULT_COMPONENT_MAPPINGS_TOKEN, useValue: RENDER_DEFAULT_COMPONENT_MAPPINGS }
      ]
    };
  }
}
