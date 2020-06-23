import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PipeModule } from './../../pipe';
import { DirectiveModule } from './../../directive';
import { HtmlEditorComponent } from './html-editor.component';
import { HtmlEditorContainerModalComponent } from './html-editor-container-modal/html-editor-container-modal.component';
import { HtmlEditorCreateLinkModalComponent } from './modal/html-editor-create-link-modal/html-editor-create-link-modal.component';
import { HtmlEditorInsertImgModalComponent } from './modal/html-editor-insert-img-modal/html-editor-insert-img-modal.component';
import { EditorPathComponent } from './components/editor-path/editor-path.component';
import { EditorToolbarComponent } from './components/editor-toolbar/editor-toolbar.component';
import { HtmlEditorInsertTableModalComponent } from './modal/html-editor-insert-table-modal/html-editor-insert-table-modal.component';
import { HtmlEditorInsertVideoModalComponent } from './modal/html-editor-insert-video-modal/html-editor-insert-video-modal.component';

@NgModule({
  imports: [
    CommonModule,
    PipeModule,
    DirectiveModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
  ],
  declarations: [
    HtmlEditorContainerModalComponent,
    HtmlEditorComponent,
    EditorPathComponent,
    EditorToolbarComponent,
    HtmlEditorCreateLinkModalComponent,
    HtmlEditorInsertImgModalComponent,
    HtmlEditorInsertTableModalComponent,
    HtmlEditorInsertVideoModalComponent,
  ],
  exports: [
    // HtmlEditorComponent
  ]
})
export class HtmlEditorModule {
}
