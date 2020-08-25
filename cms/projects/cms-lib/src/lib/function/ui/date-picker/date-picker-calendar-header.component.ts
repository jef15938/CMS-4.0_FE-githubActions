import {
  Component, OnDestroy, Inject, ChangeDetectorRef
} from '@angular/core';
import { MAT_DATE_FORMATS, DateAdapter, MatDateFormats } from '@angular/material/core';
import { NgxMatCalendar } from '@angular-material-components/datetime-picker';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/** Custom header component for datepicker. */
@Component({
  selector: 'cms-date-picker-calendar-header',
  templateUrl: './date-picker-calendar-header.component.html',
  styleUrls: ['./date-picker-calendar-header.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerCalendarHeaderComponent implements OnDestroy {
  private destroyed$ = new Subject<void>();

  mode: 'year' | 'month' | 'day' = 'day';

  initDate: Date;

  constructor(
    public calendar: NgxMatCalendar<Date>,
    public dateAdapter: DateAdapter<Date>,
    @Inject(MAT_DATE_FORMATS) public dateFormats: MatDateFormats,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    calendar.stateChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => changeDetectorRef.markForCheck());

    calendar.yearSelected.pipe(takeUntil(this.destroyed$))
      .subscribe(res => {
        setTimeout(() => {
          calendar.currentView = 'month';
          this.mode = 'day';
        }, 0);

      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  get periodLabel() {
    return `${this.calendar.activeDate.getFullYear()} 年 ${this.calendar.activeDate.getMonth() + 1} 月`;
  }

  openYear() {
    this.initDate = new Date(this.calendar.activeDate);
    this.calendar.currentView = 'multi-year';
    this.mode = 'year';
  }

  openMonth() {
    if (this.mode === 'year') {
      this.calendar.activeDate = new Date(this.initDate);
    }
    this.calendar.currentView = 'year';
    this.mode = 'month';
  }

  openDay() {
    if (this.mode === 'year') {
      this.calendar.activeDate = new Date(this.initDate);
    }
    this.calendar.currentView = 'month';
    this.mode = 'day';
  }

  previousClicked(mode: 'month' | 'year') {
    this.calendar.activeDate = mode === 'month' ?
      this.dateAdapter.addCalendarMonths(this.calendar.activeDate, -1) :
      this.dateAdapter.addCalendarYears(this.calendar.activeDate, -10);
  }

  nextClicked(mode: 'month' | 'year') {
    this.calendar.activeDate = mode === 'month' ?
      this.dateAdapter.addCalendarMonths(this.calendar.activeDate, 1) :
      this.dateAdapter.addCalendarYears(this.calendar.activeDate, 10);
  }
}
