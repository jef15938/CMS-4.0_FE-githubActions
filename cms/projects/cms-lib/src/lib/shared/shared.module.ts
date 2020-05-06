import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '@neux/core';
// Material
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
// cms-lib
import { TreeModule } from 'projects/cms-lib/src/lib/ui/tree/tree.module';
import { ModalModule } from 'projects/cms-lib/src/lib/ui/modal/modal.module';
import { TableModule } from 'projects/cms-lib/src/lib/ui/table/table.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    // Material
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatPaginatorModule,
    // cms-lib
    TreeModule,
    ModalModule,
    TableModule,
  ]
})
export class SharedModule { }
