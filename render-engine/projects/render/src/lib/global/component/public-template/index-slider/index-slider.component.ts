import { Component, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'rdr-index-slider',
  templateUrl: './index-slider.component.html',
  styleUrls: ['./index-slider.component.scss']
})
export class IndexSliderComponent implements OnInit {

  config: SwiperConfigInterface = {
    updateOnWindowResize: true,
    slidesPerView: 1,
    spaceBetween: 0,
    keyboard: true,
    pagination: {
      el: '.slider__pagination',
      type: 'bullets',
      bulletElement: 'span',
      clickable: true,
    },
    // navigation: false,
  };

  constructor() { }

  ngOnInit(): void {
  }

}
