import { NgModule } from '@angular/core';
import { IconPageComponent } from './components/icon-page/icon-page.component';
import { SliderComponent } from './components/slider/slider.component';
import { TabModule } from './components/tab/tab.module';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { WrapperModule } from './wrapper/wrapper.module';
import { FieldsDemoComponent } from './components/fields-demo/fields-demo.component';
import { SafeHtmlPipe } from './pipe/safe-html.pipe';
import { GroupTemplateDemoComponent } from './components/group-template-demo/group-template-demo.component';
import { DataSourceDemoComponent } from './components/data-source-demo/data-source-demo.component';

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
    GroupTemplateDemoComponent,
    DataSourceDemoComponent,
  ],
  exports: [
    IconPageComponent,
    SliderComponent,
    WrapperModule,
    TabModule
  ]
})
export class LayoutModule { }
