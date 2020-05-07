import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CellRendererWrapperDirective } from './cell-renderer-wrapper.directive';
import { ColResizerDirective } from './col-resizer.directive';

const COMPONENTS = [
  TableComponent
];

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  declarations: [
    ...COMPONENTS,
    CellRendererWrapperDirective,
    ColResizerDirective
  ],
  exports: [
    ...COMPONENTS
  ],
})
export class TableModule { }
