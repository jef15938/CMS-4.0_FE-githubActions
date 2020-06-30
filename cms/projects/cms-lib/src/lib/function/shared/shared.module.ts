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
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatRadioModule } from '@angular/material/radio';
// @neux/core
import { CoreModule } from '@neux/core';
// cms-lib
import { DirectiveModule } from '../../global/directive';
import { PipeModule } from '../../global/pipe';
import { TreeModule } from '../ui/tree';
import { ModalModule } from '../ui/modal';
import { TableModule } from '../ui/table';
import { ContentEditorModule } from '../ui/content-editor';
import { HtmlEditorModule } from '../ui/html-editor';
import { CropperModule } from '../ui/cropper';
import { FarmModule } from '../ui/farm';

@NgModule({
  declarations: [],
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
    MatButtonModule,
    DragDropModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatRadioModule,
    // @neux/core
    CoreModule,
    // cms-lib
    DirectiveModule,
    PipeModule,
    TreeModule,
    ModalModule,
    TableModule,
    ContentEditorModule,
    HtmlEditorModule,
    CropperModule,
    FarmModule,
  ]
})
export class SharedModule { }
