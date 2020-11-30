import { Component, Inject, Injector, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { WINDOW_RESIZE_TOKEN } from '@neux/ui';
import { Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { CommonUtils } from '../../../../utils/common-util';
import { CustomizeBaseDirective } from '../../base-component';

export interface CardNewsData {
  url: string;
  date: Date;
  title: string;
  content: string;
}

@Component({
  selector: 'rdr-card-news',
  templateUrl: './card-news.component.html',
  styleUrls: ['./card-news.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardNewsComponent extends CustomizeBaseDirective implements OnInit {

  @Input() cardNewsData: CardNewsData;

  /** 字數限制 */
  ellipsisTitleTextNumber: number;
  ellipsisDescTextNumber: number;

  constructor(
    injector: Injector,
    @Inject(WINDOW_RESIZE_TOKEN) private resize$: Observable<Event>
  ) {
    super(injector);
  }

  ngOnInit(): void {
    /** Binding Resize event */
    CommonUtils.isMobile$(this.resize$, 768).pipe(
      tap(result => {
        this.ellipsisTitleTextNumber = result ? 22 : 43;
        this.ellipsisDescTextNumber = result ? 28 : 53;
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

}
