import { AfterContentInit, Component, ContentChildren, EventEmitter, Injector, Input, OnInit, Output, QueryList, ViewEncapsulation } from '@angular/core';
import { CustomizeBaseDirective } from '../../base-component';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { TabItemComponent } from '../tab-item/tab-item.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'rdr-tab-carousel-frame',
  templateUrl: './tab-carousel-frame.component.html',
  styleUrls: ['./tab-carousel-frame.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TabCarouselFrameComponent extends CustomizeBaseDirective implements OnInit, AfterContentInit {

  @Output() tabChange: EventEmitter<number> = new EventEmitter<number>();

  selectedIndex = 0;
  @Input()
  public get selectedDefaultIndex() {
    return this.selectedIndex;
  }
  public set selectedDefaultIndex(value) {
    this.selectedIndex = value;
  }


  perView = 5;

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
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {

  }

  ngAfterContentInit() {
    this.onSelect(this.tabs.toArray()[this.selectedDefaultIndex]);
    this.tabs.changes.pipe(takeUntil(this.destroy$)).subscribe(tabs => {
      this.onSelect(tabs.toArray()[this.selectedDefaultIndex]);
    });
  }

  /** 當選到的tab */
  onSelect(tab) {
    this.select(tab);
  }

  /**
   * 打開選取到的tab，關掉其他tab
   *
   * @param {TabItemComponent} tab
   */
  select(tab: TabItemComponent) {
    if (!this.tabs || this.tabs.length === 0 || !tab) {
      return;
    }
    const selectIndex = this.tabs.toArray().findIndex((item) => item === tab);
    this.selectedIndex = selectIndex;
    this.tabs.forEach((item) => {
      item.show = false;
    });
    this.selectedTab = tab;
    this.selectedTab.show = true;
    this.tabChange.emit(selectIndex);
  }
}
