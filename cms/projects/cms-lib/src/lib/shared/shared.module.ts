import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '@neux/core';
// cms-lib
import { TreeModule } from 'projects/cms-lib/src/lib/ui/tree/tree.module';
import { DialogModule } from 'projects/cms-lib/src/lib/ui/dialog/dialog.module';
// Material
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

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
    MatCardModule,
    // cms-lib
    TreeModule,
    DialogModule,
  ]
})
export class SharedModule { }
