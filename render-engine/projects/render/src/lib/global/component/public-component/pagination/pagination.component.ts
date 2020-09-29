import { Component, EventEmitter, Injector, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { CustomizeBaseDirective } from '../base-component';
import { PaginationInfo } from './pagination.interface';

export interface PageChangeEvent {
  currentPage: number;
  previousPage?: number;
  totalPage: number;
}

@Component({
  selector: 'rdr-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaginationComponent extends CustomizeBaseDirective implements OnInit, OnChanges {

  /** page info */
  @Input() pageInfo: PaginationInfo;

  /** 頁碼一次呈現幾頁 */
  @Input() pagePerView = 4;

  /** 當前頁碼 */
  activePage: number;

  /** 總頁碼 */
  totalPage = 0;

  firstPage = 1;
  headShow: boolean;
  tailShow: boolean;

  /** 當前頁數呈現 */
  pageList: Array<number | string>;

  @Output() pagesChange: EventEmitter<PageChangeEvent> = new EventEmitter<PageChangeEvent>();

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnChanges() {
    this.totalPage = this.pageInfo?.totalPage;
    this.goToPage(this.pageInfo?.currentPage);
  }

  ngOnInit(): void {

  }

  /** 點擊更改頁碼 */
  changePage(event: Event, item: number): void {
    event.preventDefault();
    this.goToPage(item);
  }

  /** 移動到特定那一頁 */
  goToPage(index: number): void {
    const previousPage = this.activePage;
    this.activePage = index;
    this.pageList = this.getDisplayPageList(index);
    this.emitPageEvent(previousPage);
  }

  /** 往上一頁 */
  previousPage(): void {
    if (!this.hasPreviousPage()) {
      return;
    }
    const privious = this.activePage - 1;
    this.goToPage(privious);
  }

  /** 往下一頁 */
  nextPage(): void {
    if (!this.hasNextPage()) {
      return;
    }
    const next = this.activePage + 1;
    this.goToPage(next);
  }

  /** 前往第一頁 */
  goToFirstPage(event: Event): void {
    event.preventDefault();
    if (!this.hasPreviousPage()) {
      return;
    }
    this.goToPage(this.firstPage);
  }

  /** 前往最後一頁 */
  goToLastPage(event: Event): void {
    event.preventDefault();
    if (!this.hasNextPage()) {
      return;
    }
    this.goToPage(this.totalPage);
  }

  /** 是否還有前一頁 */
  private hasPreviousPage(): boolean {
    return this.activePage > 1;
  }

  /** 是否還有下一頁 */
  private hasNextPage(): boolean {
    const nextPageIndex = this.activePage + 1;
    return nextPageIndex <= this.totalPage;
  }

  /** 取得當前頁數呈現 */
  private getDisplayPageList(activeIndex: number) {
    const perView = { length: this.pagePerView };
    const ratio = Math.ceil(activeIndex / this.pagePerView) - 1;
    let pages = [];

    if (this.totalPage > this.pagePerView + 1) {
      if (activeIndex <= this.pagePerView) {
        pages = Array.from(perView, (v, i) => i + 1);
      } else if (activeIndex > (this.totalPage - this.pagePerView)) {
        pages = Array.from(perView, (v, i) => this.totalPage - i).reverse();
      } else {
        pages = Array.from(perView, (v, i) => this.pagePerView * ratio + (i + 1));
      }

    } else {
      pages = Array.from({ length: this.totalPage }, (v, i) => i + 1);
    }

    return pages;
  }

  /** 觸發page event */
  private emitPageEvent(priviousPageIndex: number): void {
    this.pagesChange.emit({
      currentPage: this.activePage,
      previousPage: priviousPageIndex,
      totalPage: this.totalPage
    });
  }
}
