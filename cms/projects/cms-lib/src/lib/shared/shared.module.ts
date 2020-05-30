// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
// @neux/core
import { CoreModule } from '@neux/core';
// cms-lib
import { TreeModule } from './../ui/tree/tree.module';
import { ModalModule } from './../ui/modal/modal.module';
import { TableModule } from './../ui/table/table.module';
import { DirectiveModule } from './../directive/directive.module';

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
    // @neux/core
    CoreModule,
    // cms-lib
    TreeModule,
    ModalModule,
    TableModule,
    DirectiveModule
  ]
})
export class SharedModule { }
