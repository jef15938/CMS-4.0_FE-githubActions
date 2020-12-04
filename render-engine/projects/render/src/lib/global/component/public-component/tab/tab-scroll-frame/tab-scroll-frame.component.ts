import {
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Inject,
  Injector,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewEncapsulation,
  AfterContentInit,
} from '@angular/core';
import { WINDOW_RESIZE_TOKEN } from '@neux/ui';
import { Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { CommonUtils } from '../../../../utils/common-util';
import { CustomizeBaseDirective } from '../../base-component';
import { TabItemComponent } from '../tab-item/tab-item.component';

@Component({
  selector: 'rdr-tab-scroll-frame',
  templateUrl: './tab-scroll-frame.component.html',
  styleUrls: ['./tab-scroll-frame.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TabScrollFrameComponent extends CustomizeBaseDirective implements OnInit, AfterViewInit, AfterContentInit {

  @ContentChildren(TabItemComponent) tabs: QueryList<TabItemComponent>;

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

  selectedIndex = 0;
  listItemWidth: string;
  selectedTab: TabItemComponent;

  constructor(
    injector: Injector,
    @Inject(WINDOW_RESIZE_TOKEN) protected resize$: Observable<Event>
  ) {
    super(injector);
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.listItemWidth = this.calListItemWidth(window.innerWidth < 768);
    this.select(this.tabs.toArray()[this.selectedDefaultIndex]);
    this.tabs.changes.pipe(takeUntil(this.destroy$)).subscribe(tabs => {
      this.select(tabs.toArray()[this.selectedDefaultIndex]);
    });
  }

  ngAfterViewInit() {
    /** Binding Resize event */
    CommonUtils.isMobile$(this.resize$, 768).pipe(
      tap(result => {
        this.listItemWidth = this.calListItemWidth(result);
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  /**
   * 當選取到tab
   *
   * @param {TabItemComponent} tab tabItem component
   * @param {number} index 指定打開的tab
   * @returns
   */
  onSelect(tab: TabItemComponent) {
    this.select(tab);
  }

  /**
   * 打開選取到的tab，關掉其他tab
   *
   * @param {TabItemComponent} tab
   */
  select(tab: TabItemComponent) {
    if (!this.tabs || this.tabs.length === 0) {
      return;
    }

    this.tabs.forEach((item) => {
      item.show = false;
    });

    this.selectedTab = tab;
    this.selectedIndex = this.tabs.toArray().findIndex((item) => item === tab);
    this.selectedTab.show = true;
    this.tabChange.emit(this.selectedIndex);
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

  private calListItemWidth(isMobile: boolean) {
    return isMobile
      ? `${this.getTabMobileWidth(this.tabs.length)}px`
      : `${this.getTabPCWidth(this.tabs.length) / this.tabs.length}px`;
  }
}
