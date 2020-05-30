import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtmlEditorComponent } from './html-editor.component';
import { HtmlEditorService } from './html-editor.service';
import { EditorContainerModalComponent } from './editor-container-modal/editor-container-modal.component';
import { TableToolbarComponent } from './components/table-toolbar/table-toolbar.component';
import { ImageToolbarComponent } from './components/image-toolbar/image-toolbar.component';
import { PipeModule } from '../../pipe/pipe.module';
import { HtmlEditorServiceInjectionToken } from './html-editor.injection-token';

@NgModule({
  imports: [
    CommonModule,
    PipeModule,
  ],
  declarations: [
    EditorContainerModalComponent,
    HtmlEditorComponent,
    TableToolbarComponent,
    ImageToolbarComponent,
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
