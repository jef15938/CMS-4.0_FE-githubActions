import { Component, OnInit, Injector, ViewEncapsulation, Input, Inject } from '@angular/core';
import { WINDOW_RESIZE_TOKEN } from '@neux/ui';
import { Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { CommonUtils } from '../../../../utils/common-util';
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
export class CardNewsListComponent extends CustomizeBaseDirective implements OnInit {

  @Input() title: string;
  @Input() newsList: CardNewsListData[];

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
    CommonUtils.isMobile$(this.resize$, 768).pipe(
      tap(result => this.ellipsisTitleTextNumber = result ? 26 : 18),
      takeUntil(this.destroy$)
    ).subscribe();
  }

}
