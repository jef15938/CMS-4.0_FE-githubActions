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

  constructor(
    private calendar: NgxMatCalendar<Date>,
    private dateAdapter: DateAdapter<Date>,
    @Inject(MAT_DATE_FORMATS) private dateFormats: MatDateFormats,
    changeDetectorRef: ChangeDetectorRef
  ) {
    calendar.stateChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => changeDetectorRef.markForCheck());
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  get periodLabel() {
    return `${this.calendar.activeDate.getFullYear()} 年 ${this.calendar.activeDate.getMonth() + 1} 月`;
    // return this.dateAdapter
    //   .format(this.calendar.activeDate, this.dateFormats.display.monthYearLabel)
    //   .toLocaleUpperCase();
  }

  openYear() {
    this.calendar.currentView = 'year';
  }

  previousClicked(mode: 'month' | 'year') {
    this.calendar.activeDate = mode === 'month' ?
      this.dateAdapter.addCalendarMonths(this.calendar.activeDate, -1) :
      this.dateAdapter.addCalendarYears(this.calendar.activeDate, -1);
  }

  nextClicked(mode: 'month' | 'year') {
    this.calendar.activeDate = mode === 'month' ?
      this.dateAdapter.addCalendarMonths(this.calendar.activeDate, 1) :
      this.dateAdapter.addCalendarYears(this.calendar.activeDate, 1);
  }
}
