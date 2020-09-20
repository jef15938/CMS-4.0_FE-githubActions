import { AfterViewInit, Component, ContentChildren, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { fromEvent, interval, Observable, Subject } from 'rxjs';
import { animationFrame } from 'rxjs/internal/scheduler/animationFrame';
import { debounceTime, scan, switchMap, takeWhile, tap } from 'rxjs/operators';
import { TlTabItemComponent } from '../tab-item/tab-item.component';

@Component({
  selector: 'rdr-tab-scroll-frame',
  templateUrl: './tab-scroll-frame.component.html',
  styleUrls: ['./tab-scroll-frame.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TabScrollFrameComponent implements OnInit, AfterViewInit {

  @ContentChildren(TlTabItemComponent) tabs: QueryList<TlTabItemComponent>;
  @ViewChild('tabShell') tabShell: ElementRef;
  @ViewChildren('tabItem') tabItemList: QueryList<ElementRef>;

  private scrollToItem: Subject<any> = new Subject<any>();
  private selectedIndex: number;
  private increment: number;
  listItemWidth: string;
  selectedTab: TlTabItemComponent;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    fromEvent(window, 'resize').pipe(
      debounceTime(200),
      tap(() => { this.scrollToPosition(this.selectedIndex); })
    ).subscribe();

    this.scrollToItem.pipe(
      switchMap((targetX) => this.animateScroll(targetX, this.increment, 1)),
    ).subscribe();

    setTimeout(() => {
      this.onSelect(this.tabs.first, 0);
      this.listItemWidth = `${this.getTabWidth(this.tabs.length) / this.tabs.length}px`;
    });
  }

  /** 當選取到tab */
  onSelect(tab: TlTabItemComponent, index: number) {
    if (this.selectedIndex === index) {
      return;
    }
    this.increment = this.getIncrement(this.selectedIndex, index);
    this.select(tab);
    this.scrollToPosition(index);
  }

  /** 打開選取到的tab，關掉其他tab */
  select(tab: TlTabItemComponent) {
    this.tabs.forEach((item) => {
      item.show = false;
    });

    this.selectedTab = tab;
    this.selectedIndex = this.tabs.toArray().findIndex((item) => item === tab);
    this.selectedTab.show = true;
  }

  /** 滑動到指定的位置 */
  scrollToPosition(index: number) {
    const parentElement = this.tabShell.nativeElement;
    const childElement = this.tabItemList.toArray()[index].nativeElement;
    const activeoffsetLeft = childElement.offsetLeft - parentElement.offsetLeft;

    if (this.isScrollable(parentElement)) {
      this.scrollToItem.next(activeoffsetLeft);
    }
  }

  /**
   * smooth scroll animation
   * @param {number} targetXPosition
   * @param {number} navagation
   * @param {number} duration 單位:秒 seconds
   * @returns {Observable<any>}
   */
  animateScroll(targetXPosition: number, navagation: number, duration: number): Observable<any> {
    const progress = 60 * duration;
    const startPosition = this.tabShell.nativeElement.scrollLeft;
    const step = Math.abs(targetXPosition - startPosition) / progress;

    return interval(0, animationFrame).pipe(
      scan((acc, curr) => acc + (navagation * step), startPosition),
      tap(position => {
        this.tabShell.nativeElement.scrollTo(position, 0);
      }),
      takeWhile((val) => navagation === 1 ? val < targetXPosition : val > targetXPosition)
    );
  }

  /** 判斷元素是否有滾動條 */
  isScrollable(ele): boolean {
    return ele.scrollWidth > ele.clientWidth;
  }

  /** 取得累加方向 */
  getIncrement(start, end): number {
    return end >= start ? 1 : -1;
  }

  /** 依據tab數量給容器寬度 */
  getTabWidth(tabLength: number): number {
    const tabWidth = [366, 560, 750, 944];

    switch (tabLength) {
      case 2:
        return tabWidth[0];
      case 3:
        return tabWidth[1];
      case 4:
      case 5:
        return tabWidth[2];
      default:
        return tabWidth[3];
    }
  }
}
