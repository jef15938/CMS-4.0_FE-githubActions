import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DynamicWrapperModule } from '@neux/core';
import { TableComponent } from './table.component';
import { DirectiveModule } from './../../../global/directive/directive.module';
import { PipeModule } from '../../../global/pipe';
import { GetTableDisplayColsPipe } from './pipe/get-table-display-cols.pipe';
import { CellRenderOnloadPipe } from './pipe/cell-render-onload.pipe';

@NgModule({
  imports: [
    CommonModule,
    DynamicWrapperModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCheckboxModule,
    DirectiveModule,
    PipeModule
  ],
  declarations: [
    TableComponent,
    GetTableDisplayColsPipe,
    CellRenderOnloadPipe,
  ],
  exports: [
    TableComponent
  ],
})
export class TableModule { }
