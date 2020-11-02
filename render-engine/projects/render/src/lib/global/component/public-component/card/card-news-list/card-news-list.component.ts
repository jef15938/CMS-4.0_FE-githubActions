import { Component, OnInit, Injector, ViewEncapsulation, Input, OnDestroy, Inject } from '@angular/core';
import { WINDOW_RESIZE_TOKEN } from '@neux/ui';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { CommonUtils } from '../../../../utils';
import { CustomizeBaseDirective } from '../../base-component';

export interface CardNewsListData {
  url: string;
  date: Date;
  title: string;
}

@Component({
  selector: 'rdr-card-news-list',
  templateUrl: './card-news-list.component.html',
  styleUrls: ['./card-news-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardNewsListComponent extends CustomizeBaseDirective implements OnInit, OnDestroy {

  @Input() title: string;
  @Input() newsList: CardNewsListData[];

  unsubscribe$: Subject<null> = new Subject();

  /** 字數限制 */
  ellipsisTitleTextNumber: number;

  constructor(
    injector: Injector,
    @Inject(WINDOW_RESIZE_TOKEN) private resize$: Observable<Event>
  ) {
    super(injector);
  }

  ngOnInit(): void {
    /** Binding Resize event */
    CommonUtils.isMobile$(this.resize$).pipe(
      tap(result => this.ellipsisTitleTextNumber = result ? 25 : 18),
      takeUntil(this.unsubscribe$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
