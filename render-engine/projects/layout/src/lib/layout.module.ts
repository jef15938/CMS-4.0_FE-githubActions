import { NgModule } from '@angular/core';
import { IconPageComponent } from './components/icon-page/icon-page.component';
import { SliderComponent } from './components/slider/slider.component';
import { TabModule } from './components/tab/tab.module';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { LayoutBaseModule } from './wrapper/layout-base/layout-base.module';
import { FieldsDemoComponent } from './components/fields-demo/fields-demo.component';
import { TemplateFieldDirective } from './wrapper/layout-wrapper/template-field.directive';



@NgModule({
  imports: [
    TabModule,
    LayoutBaseModule,
    SwiperModule
  ],
  declarations: [
    IconPageComponent,
    SliderComponent,
    FieldsDemoComponent,
    TemplateFieldDirective,
  ],
  exports: [
    IconPageComponent,
    SliderComponent,
    LayoutBaseModule,
    TabModule
  ]
})
export class LayoutModule { }
