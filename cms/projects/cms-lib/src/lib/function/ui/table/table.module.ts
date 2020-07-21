import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
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
    MatPaginatorModule,
    MatButtonModule,
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
