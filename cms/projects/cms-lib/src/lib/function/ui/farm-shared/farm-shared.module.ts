import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { FarmSharedComponent } from './farm-shared.component';
import { FarmDetailInfoComponent } from './component/farm-detail-info/farm-detail-info.component';
import { FarmSearchInfoComponent } from './component/farm-search-info/farm-search-info.component';
import { FarmTableInfoComponent } from './component/farm-table-info/farm-table-info.component';
import { GetFarmTableDisplayColsPipe } from './component/farm-table-info/pipe/get-farm-table-display-cols.pipe';
import { GetFarmTableColDataPipe } from './component/farm-table-info/pipe/get-farm-table-col-data.pipe';
import { GetFarmTableDataActionsPipe } from './component/farm-table-info/pipe/get-farm-table-data-actions.pipe';
import { FarmFormInfoComponent } from './component/farm-form-info/farm-form-info.component';
import { FarmFormViewDataModalComponent } from './modal/farm-form-view-data-modal/farm-form-view-data-modal.component';
import { FarmFormModifyDataModalComponent } from './modal/farm-form-modify-data-modal/farm-form-modify-data-modal.component';
import { FarmFormValidationErrorsPipe } from './pipe/farm-form-validation-errors.pipe';
import { FarmDynamicFormControlDirective } from './directive/farm-dynamic-form-control.directive';
import { TreeModule } from '../tree/tree.module';
import { PipeModule } from '../../../global/pipe/pipe.module';
import { AuditingFarmDataModalComponent } from './modal/auditing-farm-data-modal/auditing-farm-data-modal.component';

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
    MatButtonModule,
    PipeModule,
    TreeModule,
  ],
  declarations: [
    FarmSharedComponent,
    FarmDetailInfoComponent,
    FarmSearchInfoComponent,
    FarmTableInfoComponent,
    GetFarmTableDisplayColsPipe,
    GetFarmTableColDataPipe,
    GetFarmTableDataActionsPipe,
    FarmFormInfoComponent,
    AuditingFarmDataModalComponent,
    FarmFormViewDataModalComponent,
    FarmFormModifyDataModalComponent,
    FarmFormValidationErrorsPipe,
    FarmDynamicFormControlDirective,
  ],
  exports: [
    FarmSharedComponent
  ]
})
export class FarmModule { }
