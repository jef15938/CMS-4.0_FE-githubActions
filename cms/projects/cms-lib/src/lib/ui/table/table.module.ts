import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CellRendererWrapperDirective } from './cell-renderer-wrapper.directive';
import { DirectiveModule } from 'projects/cms-lib/src/lib/directive/directive.module';

const COMPONENTS = [
  TableComponent
];

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    DirectiveModule,
  ],
  declarations: [
    ...COMPONENTS,
    CellRendererWrapperDirective,
  ],
  exports: [
    ...COMPONENTS
  ],
})
export class TableModule { }
