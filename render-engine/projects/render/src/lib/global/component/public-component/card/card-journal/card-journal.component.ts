import { Component, Inject, Injector, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { WINDOW_RESIZE_TOKEN } from '@neux/ui';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { takeUntil, tap } from 'rxjs/operators';
import { CommonUtils } from '../../../../utils';
import { CustomizeBaseDirective } from '../../base-component';

export interface CardJournalData {
  url: string;
  imgUrl: string;
  title: string;
  subTitle: string;
  content: string;
}

@Component({
  selector: 'rdr-card-journal',
  templateUrl: './card-journal.component.html',
  styleUrls: ['./card-journal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardJournalComponent extends CustomizeBaseDirective implements OnInit, OnDestroy {

  @Input() cardJournalData: CardJournalData;

  unsubscribe$: Subject<null> = new Subject();

  /** 字數限制 */
  ellipsisDescTextNumber: number;
  ellipsisSubTitleTextNumber: number;

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
        this.ellipsisDescTextNumber = result ? 137 : 244;
        this.ellipsisSubTitleTextNumber = result ? 33 : 37;
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
