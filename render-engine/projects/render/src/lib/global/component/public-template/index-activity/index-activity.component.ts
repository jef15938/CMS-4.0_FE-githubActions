import { Component, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'rdr-index-activity',
  templateUrl: './index-activity.component.html',
  styleUrls: ['./index-activity.component.scss']
})
export class IndexActivityComponent implements OnInit {

  activityList: Array<{ title: string, description: string }> = [
    { title: '當我們LINE在一起 好禮一直抽', description: '投保指定險種抽獎次數翻倍!!!月月送濾水壺、氣炸鍋、跑步機~' },
    { title: '台灣人壽 – 業務菁英招募計畫', description: '誠摯地邀請您加入台灣人壽，成為新一代業務菁英' },
    { title: '唯e守護傷害保險', description: '台灣人壽 新商品上線!' }
  ];

  config: SwiperConfigInterface = {
    updateOnWindowResize: true,
    slidesPerView: 3,
    spaceBetween: 16,
    keyboard: true,
    navigation: {
      nextEl: '.activity__nav--next',
      prevEl: '.activity__nav--prev',
      disabledClass: 'activity__nav--disabled'
    }
  };
  constructor() { }

  ngOnInit(): void {
  }

}
