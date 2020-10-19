import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { TabItemComponent } from './tab-item/tab-item.component';
import { WrapperModule } from '../../../../function/wrapper/wrapper.module';
import { TabScrollFrameComponent } from './tab-scroll-frame/tab-scroll-frame.component';
import { TabCarouselFrameComponent } from './tab-carousel-frame/tab-carousel-frame.component';
import { TabScrollableComponent } from './tab-scrollable/tab-scrollable.component';
import { TabCarouselComponent } from './tab-carousel/tab-carousel.component';


@NgModule({
  declarations: [
    TabItemComponent,
    TabScrollFrameComponent,
    TabCarouselFrameComponent,
    TabScrollableComponent,
    TabCarouselComponent
  ],
  imports: [
    CommonModule,
    WrapperModule,
    SwiperModule
  ],
  exports: [
    TabItemComponent,
    TabScrollFrameComponent,
    TabCarouselFrameComponent,
    TabScrollableComponent,
    TabCarouselComponent
  ]
})
export class TabModule {

}
