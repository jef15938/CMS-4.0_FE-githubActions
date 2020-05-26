import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FarmComponent } from './farm.component';
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

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule,
    MatTabsModule,
  ],
  declarations: [
    FarmComponent,
    FarmDetailInfoComponent,
    FarmSearchInfoComponent,
    FarmTableInfoComponent
  ],
  exports: [
    FarmComponent
  ]
})
export class FarmModule { }
