import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Inject,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { WINDOW_RESIZE_TOKEN } from '@neux/ui';
import { interval, Observable, Subject } from 'rxjs';
import { animationFrame } from 'rxjs/internal/scheduler/animationFrame';
import { scan, switchMap, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { CommonUtils } from '../../../../utils';
import { CustomizeBaseDirective } from '../../base-component';
import { TabItemComponent } from '../tab-item/tab-item.component';

@Component({
  selector: 'rdr-tab-scroll-frame',
  templateUrl: './tab-scroll-frame.component.html',
  styleUrls: ['./tab-scroll-frame.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TabScrollFrameComponent extends CustomizeBaseDirective implements OnInit, AfterViewInit, OnDestroy {

  @ContentChildren(TabItemComponent) tabs: QueryList<TabItemComponent>;
  @ViewChild('tabShell') tabShell: ElementRef;
  @ViewChildren('tabItem') tabItemList: QueryList<ElementRef>;

  @Output() tabChange: EventEmitter<number> = new EventEmitter<number>();

  private _selectedDefaultIndex = 0;
  @Input()
  public get selectedDefaultIndex() {
    return this._selectedDefaultIndex;
  }
  public set selectedDefaultIndex(value) {
    this._selectedDefaultIndex = value;
    this.selectedIndex = value;
  }

  unsubscribe$: Subject<null> = new Subject();
  private scrollToItem: Subject<any> = new Subject<any>();
  private selectedIndex = 0;
  private increment: number;
  listItemWidth: string;
  selectedTab: TabItemComponent;

  constructor(
    injector: Injector,
    @Inject(WINDOW_RESIZE_TOKEN) private resize$: Observable<Event>) {
    super(injector);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    /** Binding Resize event */
    CommonUtils.isMobile$(this.resize$).pipe(
      tap(result => {
        if (result) {
          this.listItemWidth = `${this.getTabMobileWidth(this.tabs.length)}px`;
        } else {
          this.listItemWidth = `${this.getTabPCWidth(this.tabs.length) / this.tabs.length}px`;
        }
        this.onSelect(this.tabs.toArray()[this.selectedIndex], this.selectedIndex);
      }),
      tap(() => this.scrollToPosition(this.selectedIndex)),
      takeUntil(this.unsubscribe$)
    ).subscribe();

    this.scrollToItem.pipe(
      switchMap((targetX) => this.animateScroll(targetX, this.increment, 1)),
    ).subscribe();
  }

  /**
   * 當選取到tab
   *
   * @param {TabItemComponent} tab tabItem component
   * @param {number} index 指定打開的tab
   * @returns
   */
  onSelect(tab: TabItemComponent, index: number) {
    this.increment = this.getIncrement(this.selectedIndex, index);
    this.select(tab);
    this.scrollToPosition(index);
  }

  /**
   * 打開選取到的tab，關掉其他tab
   *
   * @param {TabItemComponent} tab
   */
  select(tab: TabItemComponent) {
    this.tabs.forEach((item) => {
      item.show = false;
    });

    this.selectedTab = tab;
    this.selectedIndex = this.tabs.toArray().findIndex((item) => item === tab);
    this.selectedTab.show = true;
    this.tabChange.emit(this.selectedIndex);
  }

  /**
   * 滑動到指定的位置
   *
   * @param {number} index 指定到的位置
   */
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
   * @param {number} targetXPosition 目標移動位置
   * @param {number} navagation 移動方向
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

  /**
   * 判斷元素是否有滾動條
   * @param {number} ele 元素
   */
  isScrollable(ele): boolean {
    return ele.scrollWidth > ele.clientWidth;
  }

  /**
   * 取得累加方向
   * @param {number} start 起始位置
   * @param {number} end 結束位置
   */
  getIncrement(start, end): number {
    return end >= start ? 1 : -1;
  }

  /**
   * 取得tab pc 數量寬度
   * @param {number} tabLength tab項目總數量
   */
  getTabPCWidth(tabLength: number): number {
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

  /**
   * 取得tab mobile 數量寬度
   * @param {number} tabLength tab項目總數量
   */
  getTabMobileWidth(tabLength: number): number {
    const tabItemWidth = [140, 114];

    return tabLength > 2 ? tabItemWidth[1] : tabItemWidth[0];
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
