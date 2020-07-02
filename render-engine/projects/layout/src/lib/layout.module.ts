import { NgModule } from '@angular/core';
import { IconPageComponent } from './global/component/icon-page/icon-page.component';
import { SliderComponent } from './global/component/slider/slider.component';
import { TabModule } from './global/component/tab/tab.module';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { WrapperModule } from './function/wrapper/wrapper.module';
import { FieldsDemoComponent } from './global/component/fields-demo/fields-demo.component';
import { GroupTemplateDemoComponent } from './global/component/group-template-demo/group-template-demo.component';
import { DataSourceDemoComponent } from './global/component/data-source-demo/data-source-demo.component';
import { PipeModule } from './global/pipe/pipe.module';

@NgModule({
  imports: [
    PipeModule,
    TabModule,
    WrapperModule,
    SwiperModule,
  ],
  declarations: [
    IconPageComponent,
    SliderComponent,
    FieldsDemoComponent,
    GroupTemplateDemoComponent,
    DataSourceDemoComponent,
  ],
  exports: [
    IconPageComponent,
    SliderComponent,
    FieldsDemoComponent,
    GroupTemplateDemoComponent,
    DataSourceDemoComponent,
  ]
})
export class LayoutModule { }
