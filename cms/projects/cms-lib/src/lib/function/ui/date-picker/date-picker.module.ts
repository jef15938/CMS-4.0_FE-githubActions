import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerComponent, DatePickerDatetimeComponent } from './date-picker.component';
import { DatePickerCalendarHeaderComponent } from './date-picker-calendar-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PipeModule } from '../../../global/pipe';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    PipeModule,
  ],
  declarations: [DatePickerComponent, DatePickerDatetimeComponent, DatePickerCalendarHeaderComponent],
  exports: [DatePickerComponent, DatePickerDatetimeComponent]
})
export class DatePickerModule { }
