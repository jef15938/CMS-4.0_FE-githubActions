import { AfterContentInit, Component, ContentChildren, OnInit, QueryList, ViewEncapsulation } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { TabItemComponent } from '../tab-item/tab-item.component';

@Component({
  selector: 'rdr-tab-carousel-frame',
  templateUrl: './tab-carousel-frame.component.html',
  styleUrls: ['./tab-carousel-frame.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TabCarouselFrameComponent implements OnInit, AfterContentInit {

  perView = 4;

  config: SwiperConfigInterface = {
    updateOnWindowResize: true,
    slidesPerView: this.perView,
    spaceBetween: 16,
    keyboard: true,
    navigation: {
      nextEl: '.tab-carousel__nav--next',
      prevEl: '.tab-carousel__nav--prev',
      disabledClass: 'tab-carousel__nav--disabled'
    }
  };

  @ContentChildren(TabItemComponent) tabs: QueryList<TabItemComponent>;
  selectedTab: TabItemComponent;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    this.onSelect(this.tabs.first);
  }

  /** 當選到的tab */
  onSelect(tab) {
    this.select(tab);
  }

  /** 打開選到的tab，同時關掉其他tab */
  select(tab) {
    this.tabs.forEach((item) => {
      item.show = false;
    });

    this.selectedTab = tab;
    setTimeout(() => {
      this.selectedTab.show = true;
    });
  }
}
