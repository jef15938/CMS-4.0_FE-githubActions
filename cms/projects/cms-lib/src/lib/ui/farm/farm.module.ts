import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FarmComponent } from './farm.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { FarmDetailInfoComponent } from './component/farm-detail-info/farm-detail-info.component';
import { FarmSearchInfoComponent } from './component/farm-search-info/farm-search-info.component';
import { FarmTableInfoComponent } from './component/farm-table-info/farm-table-info.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { GetDisplayColsPipe } from './component/farm-table-info/pipe/get-display-cols.pipe';
import { GetColDataPipe } from './component/farm-table-info/pipe/get-col-data.pipe';
import { GetDataActionsPipe } from './component/farm-table-info/pipe/get-data-actions.pipe';
import { FarmFormInfoComponent } from './component/farm-form-info/farm-form-info.component';
import { FarmFormViewDataModalComponent } from './modal/farm-form-view-data-modal/farm-form-view-data-modal.component';
import { FarmFormModifyDataModalComponent } from './modal/farm-form-modify-data-modal/farm-form-modify-data-modal.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FarmFormValidationErrorsPipe } from './pipe/farm-form-validation-errors.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  declarations: [
    FarmComponent,
    FarmDetailInfoComponent,
    FarmSearchInfoComponent,
    FarmTableInfoComponent,
    GetDisplayColsPipe,
    GetColDataPipe,
    GetDataActionsPipe,
    FarmFormInfoComponent,
    FarmFormViewDataModalComponent,
    FarmFormModifyDataModalComponent,
    FarmFormValidationErrorsPipe
  ],
  exports: [
    FarmComponent
  ]
})
export class FarmModule { }
