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
import { EditorSelectedPathComponent } from './components/editor-selected-path/editor-selected-path.component';

@NgModule({
  imports: [
    CommonModule,
    PipeModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    FormsModule,
  ],
  declarations: [
    EditorContainerModalComponent,
    HtmlEditorComponent,
    TableToolbarComponent,
    HtmlEditorCreateLinkModalComponent,
    HtmlEditorInsertImgModalComponent,
    EditorSelectedPathComponent,
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
