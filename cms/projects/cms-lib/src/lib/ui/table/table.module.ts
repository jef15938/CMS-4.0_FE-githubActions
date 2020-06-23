import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TableComponent } from './table.component';
import { CellRendererWrapperDirective } from './cell-renderer-wrapper.directive';
import { DirectiveModule } from './../../directive/directive.module';
import { GetTableDisplayColsPipe } from './pipe/get-table-display-cols.pipe';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    DirectiveModule,
  ],
  declarations: [
    TableComponent,
    CellRendererWrapperDirective,
    GetTableDisplayColsPipe,
  ],
  exports: [
    TableComponent
  ],
})
export class TableModule { }
