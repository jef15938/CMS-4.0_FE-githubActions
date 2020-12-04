import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Injector,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { WINDOW_RESIZE_TOKEN } from '@neux/ui';
import { interval, Observable, Subject } from 'rxjs';
import { animationFrame } from 'rxjs/internal/scheduler/animationFrame';
import { scan, switchMap, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { CommonUtils } from '../../../../utils/common-util';
import { CustomizeBaseDirective } from '../../base-component';

@Component({
  selector: 'rdr-scrollable-frame',
  templateUrl: './scrollable-frame.component.html',
  styleUrls: ['./scrollable-frame.component.scss']
})
export class ScrollableFrameComponent extends CustomizeBaseDirective implements OnInit, AfterViewInit {

  @ViewChild('shell', { static: true }) shellRef: ElementRef;
  @ViewChildren('item') itemRefList: QueryList<ElementRef>;

  @Input() itemList: any[];
  @Input() itemWidth = 176;
  @Input() itemTemplate: TemplateRef<any>;

  private _currentIndex = 0;
  @Input()
  public get currentIndex() {
    return this._currentIndex;
  }
  public set currentIndex(value) {
    this.increment = this.getIncrement(this._currentIndex, value);
    this._currentIndex = value;
    this.scrollToPosition(this._currentIndex);
  }

  private scrollToItem: Subject<any> = new Subject<any>();
  private increment: number;

  constructor(
    injector: Injector,
    @Inject(WINDOW_RESIZE_TOKEN) private resize$: Observable<Event>
  ) {
    super(injector);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    /** Binding Resize event */
    CommonUtils.isMobile$(this.resize$, 768).pipe(
      tap(() => {
        this.increment = this.getIncrement(this.currentIndex, this.currentIndex);
        this.scrollToPosition(this.currentIndex);
      }),
      takeUntil(this.destroy$)
    ).subscribe();

    this.scrollToItem.pipe(
      switchMap((targetX) => this.animateScroll(targetX, this.increment, 1)),
    ).subscribe();
  }

  /**
   * 滑動到指定的位置
   *
   * @param {number} index 指定到的位置
   */
  scrollToPosition(index: number) {
    if (!this.shellRef.nativeElement || !this.itemRefList) {
      return;
    }
    const parentElement = this.shellRef.nativeElement;
    const childElement = this.itemRefList.toArray()[index]?.nativeElement;
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
    const startPosition = this.shellRef.nativeElement.scrollLeft;
    const step = Math.abs(targetXPosition - startPosition) / progress;

    return interval(0, animationFrame).pipe(
      scan((acc, curr) => acc + (navagation * step), startPosition),
      tap(position => {
        this.shellRef.nativeElement.scrollTo(position, 0);
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
}
