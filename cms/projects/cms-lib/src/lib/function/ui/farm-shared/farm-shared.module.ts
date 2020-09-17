import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FarmSharedComponent } from './farm-shared.component';
import { FarmDetailInfoComponent } from './component/farm-detail-info/farm-detail-info.component';
import { FarmSearchInfoComponent } from './component/farm-search-info/farm-search-info.component';
import { FarmTableInfoComponent } from './component/farm-table-info/farm-table-info.component';
import { GetFarmTableDisplayColsPipe } from './pipe/get-farm-table-display-cols.pipe';
import { GetFarmTableColDataPipe } from './pipe/get-farm-table-col-data.pipe';
import { GetFarmTableDataActionsPipe } from './pipe/get-farm-table-data-actions.pipe';
import { FarmFormInfoComponent } from './component/farm-form-info/farm-form-info.component';
import { FarmFormViewDataModalComponent } from './modal/farm-form-view-data-modal/farm-form-view-data-modal.component';
import { FarmFormModifyDataModalComponent } from './modal/farm-form-modify-data-modal/farm-form-modify-data-modal.component';
import { FarmDynamicFormControlDirective } from './directive/farm-dynamic-form-control.directive';
import { TreeModule } from '../tree/tree.module';
import { PipeModule } from '../../../global/pipe/pipe.module';
import { AuditingFarmDataModalComponent } from './modal/auditing-farm-data-modal/auditing-farm-data-modal.component';
import { DatePickerModule } from '../date-picker/date-picker.module';
import { FarmSharedContainerModalComponent } from './component/farm-shared-container-modal/farm-shared-container-modal.component';
import { FarmFormCheckboxOptionCheckPipe } from './pipe/farm-form-checkbox-option-check';
import { DirectiveModule } from '../../../global/directive';
import { MatMenuModule } from '@angular/material/menu';
import { FormModalComponent } from './component';
import { TableModule } from '../table';

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
    MatSortModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatDatetimePickerModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    PipeModule,
    TreeModule,
    DatePickerModule,
    DirectiveModule,
    TableModule,
  ],
  declarations: [
    FarmSharedComponent,
    FarmDetailInfoComponent,
    FarmSearchInfoComponent,
    FarmTableInfoComponent,
    GetFarmTableDisplayColsPipe,
    GetFarmTableColDataPipe,
    GetFarmTableDataActionsPipe,
    FarmFormCheckboxOptionCheckPipe,
    FarmFormInfoComponent,
    AuditingFarmDataModalComponent,
    FarmFormViewDataModalComponent,
    FarmFormModifyDataModalComponent,
    FarmDynamicFormControlDirective,
    FarmSharedContainerModalComponent,
    FormModalComponent,
  ],
  exports: [
    FarmSharedComponent
  ]
})
export class FarmModule { }
