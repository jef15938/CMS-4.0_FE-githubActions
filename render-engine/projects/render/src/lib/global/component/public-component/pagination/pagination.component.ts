import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { PageInfo } from './pagination.interface';

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
export class PaginationComponent implements OnInit, OnChanges {

  /** page info */
  @Input() pageInfo: PageInfo = {
    totalItems: 100,
    totalPage: 10,
    currentPage: 1,
    pageSize: 10,
  };

  /** 頁碼一次呈現幾頁 */
  @Input() pagePerView = 4;

  /** 當前頁碼 */
  activePage: number;

  /** 總頁碼 */
  totalPage: number;

  firstPage = 1;
  headShow: boolean;
  tailShow: boolean;

  /** 當前頁數呈現 */
  pageList: Array<number | string>;

  @Output() pagesChange: EventEmitter<PageChangeEvent> = new EventEmitter<PageChangeEvent>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.totalPage = this.pageInfo.totalPage || this.getTotalPage();
  }

  ngOnInit(): void {
    this.totalPage = this.pageInfo.totalPage || this.getTotalPage();
    this.goToPage(1);
  }

  /** 點擊更改頁碼 */
  changePage(event: Event, item: number): void {
    event.preventDefault();
    this.goToPage(item);
  }

  /** 移動到特定那一頁 */
  goToPage(index: number): void {
    if (this.activePage === index) {
      return;
    }
    const previousPage = this.activePage;
    this.activePage = index;
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

  /** 是否需要顯示在頭 */
  private hasHead(): boolean {
    return this.activePage > this.pagePerView && this.totalPage > 5;
  }

  /** 是否需要顯示在尾 */
  private hasTail(): boolean {
    return this.activePage <= (this.totalPage - this.pagePerView) && this.totalPage > 5;
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

  /** 取得總頁數 */
  private getTotalPage(): number {
    if (!this.pageInfo.pageSize) {
      return 0;
    }

    return Math.ceil(this.pageInfo.totalItems / this.pageInfo.pageSize);
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
