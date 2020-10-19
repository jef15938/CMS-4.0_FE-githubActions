import { Component, EventEmitter, Injector, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { CustomizeBaseDirective } from '../base-component';

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

  /** 總頁碼 */
  @Input() totalPage = 0;

  /** 當前頁碼 */
  @Input() currentPage = 1;

  /** 頁碼一次呈現幾頁 */
  @Input() pagePerView = 4;

  firstPage = 1;
  headShow: boolean;
  tailShow: boolean;

  /** 當前頁數呈現 */
  pageList: Array<number>;

  @Output() pagesChange: EventEmitter<PageChangeEvent> = new EventEmitter<PageChangeEvent>();

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnChanges() {
    this.goToPage(this.currentPage);
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
    const previousPage = this.currentPage;
    this.currentPage = index;
    this.headShow = this.hasHead();
    this.tailShow = this.hasTail();
    this.pageList = this.getDisplayPageList(index);
    this.emitPageEvent(previousPage);
  }

  /** 往上一頁 */
  previousPage(): void {
    if (!this.hasPreviousPage()) {
      return;
    }
    const privious = this.currentPage - 1;
    this.goToPage(privious);
  }

  /** 往下一頁 */
  nextPage(): void {
    if (!this.hasNextPage()) {
      return;
    }
    const next = this.currentPage + 1;
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
    return this.currentPage > 1;
  }

  /** 是否還有下一頁 */
  private hasNextPage(): boolean {
    const nextPageIndex = this.currentPage + 1;
    return nextPageIndex <= this.totalPage;
  }

  /** 是否需要顯示在頭 */
  private hasHead(): boolean {
    return this.currentPage > this.pagePerView && this.totalPage > this.pagePerView + 1;
  }

  /** 是否需要顯示在尾 */
  private hasTail(): boolean {
    return this.currentPage <= (this.totalPage - this.pagePerView) && this.totalPage > this.pagePerView + 1;
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
      currentPage: this.currentPage,
      previousPage: priviousPageIndex,
      totalPage: this.totalPage
    });
  }
}
