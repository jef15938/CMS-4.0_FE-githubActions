// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// neux
import { CoreModule } from '@neux/core';
// material form
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
// material others
import { MatMenuModule } from '@angular/material/menu';
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
    // angular
    CommonModule,
    FormsModule,
    HttpClientModule,
    // neux
    CoreModule,
    // material form
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    // material others
    MatMenuModule,
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
