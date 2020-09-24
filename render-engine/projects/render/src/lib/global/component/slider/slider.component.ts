import { Component, ViewChild, Injector, Inject } from '@angular/core';
import {
  SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface
} from 'ngx-swiper-wrapper';
import { DataSourceTemplateBaseComponent } from '../../../function/wrapper/layout-base/data-source-template-base.component';
import { SliderData } from './slider.interface';
import { DataSourceTemplateInfo } from '../../interface/data-source-template-info.interface';
import { RENDER_ENVIROMENT_TOKEN } from '../../injection-token/injection-token';
import { RenderEnvironment } from '../../interface/render-environment.interface';

const TEMPLATE_ID = 'slider';

@Component({
  selector: 'rdr-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent extends DataSourceTemplateBaseComponent<SliderData> {

  defaultTemplateInfo: DataSourceTemplateInfo = {
    id: '',
    templateId: TEMPLATE_ID,
    fields: [],
    source: '',
    attributes: {
      height: '592px'
    }
  };

  disabled = false;

  config: SwiperConfigInterface = {
    updateOnWindowResize: true,
    direction: 'horizontal',
    grabCursor: true,
    loop: true,
    slidesPerView: 1,
    a11y: {
      enabled: true,
    },
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
    @Inject(RENDER_ENVIROMENT_TOKEN) public enviroment: RenderEnvironment,
  ) {
    super(injector, TEMPLATE_ID);
  }

  onIndexChange(index: number): void {
    console.log('Swiper index: ', index);
  }

  onSwiperEvent(event: string): void {
    console.log('Swiper event: ', event);
  }
}
