import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import {
  SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface
} from 'ngx-swiper-wrapper';
import { DataSourceTemplateBaseComponent } from '../../../function/wrapper/layout-base/data-source-template-base.component';
import { SliderData } from './slider.interface';
import { MOCK_SLIDER_DATA } from './slider.mock';

@Component({
  selector: 'rdr-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent extends DataSourceTemplateBaseComponent<SliderData> implements OnInit {

  disabled = false;

  config: SwiperConfigInterface = {
    updateOnWindowResize: true,
    direction: 'horizontal',
    grabCursor: true,
    loop: true,
    slidesPerView: 1,
    a11y: true,
    keyboard: true,
    scrollbar: false,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      bulletElement: 'span',
      clickable: true,
    },
    navigation: true,
  };

  @ViewChild(SwiperComponent, { static: false }) componentRef?: SwiperComponent;
  @ViewChild(SwiperDirective, { static: false }) directiveRef?: SwiperDirective;

  constructor(
    injector: Injector,
  ) {
    super(injector, MOCK_SLIDER_DATA);
  }

  onIndexChange(index: number): void {
    console.log('Swiper index: ', index);
  }

  onSwiperEvent(event: string): void {
    console.log('Swiper event: ', event);
  }
}
