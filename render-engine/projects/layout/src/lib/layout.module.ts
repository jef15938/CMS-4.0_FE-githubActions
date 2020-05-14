import { NgModule } from '@angular/core';
import { IconPageComponent } from './components/icon-page/icon-page.component';
import { SliderComponent } from './components/slider/slider.component';
import { TabModule } from './components/tab/tab.module';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { WrapperModule } from './wrapper/wrapper.module';
import { FieldsDemoComponent } from './components/fields-demo/fields-demo.component';
import { SafeHtmlPipe } from './pipe/safe-html.pipe';

@NgModule({
  imports: [
    TabModule,
    WrapperModule,
    SwiperModule
  ],
  declarations: [
    IconPageComponent,
    SliderComponent,
    FieldsDemoComponent,
    SafeHtmlPipe,
  ],
  exports: [
    IconPageComponent,
    SliderComponent,
    WrapperModule,
    TabModule
  ]
})
export class LayoutModule { }
