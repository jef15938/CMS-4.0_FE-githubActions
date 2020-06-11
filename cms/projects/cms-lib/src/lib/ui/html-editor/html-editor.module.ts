import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtmlEditorComponent } from './html-editor.component';
import { HtmlEditorService } from './html-editor.service';
import { EditorContainerModalComponent } from './editor-container-modal/editor-container-modal.component';
import { TableToolbarComponent } from './components/table-toolbar/table-toolbar.component';
import { PipeModule } from '../../pipe/pipe.module';
import { HtmlEditorServiceInjectionToken } from './html-editor.injection-token';
import { HtmlEditorCreateLinkModalComponent } from './modal/html-editor-create-link-modal/html-editor-create-link-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { HtmlEditorInsertImgModalComponent } from './modal/html-editor-insert-img-modal/html-editor-insert-img-modal.component';
import { EditorPathComponent } from './components/editor-path/editor-path.component';
import { EditorToolbarComponent } from './components/editor-toolbar/editor-toolbar.component';
import { HtmlEditorInsertTableModalComponent } from './modal/html-editor-insert-table-modal/html-editor-insert-table-modal.component';
import { DirectiveModule } from '../../directive/directive.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { HtmlEditorInsertVideoModalComponent } from './modal/html-editor-insert-video-modal/html-editor-insert-video-modal.component';
import { MatButtonModule } from '@angular/material/button';

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
    EditorContainerModalComponent,
    HtmlEditorComponent,
    EditorPathComponent,
    EditorToolbarComponent,
    TableToolbarComponent,
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
  static forRoot(providers = []): ModuleWithProviders {
    return {
      ngModule: HtmlEditorModule,
      providers: [
        HtmlEditorService,
        {
          provide: HtmlEditorServiceInjectionToken,
          useClass: HtmlEditorService,
        },
      ]
    };
  }
}
