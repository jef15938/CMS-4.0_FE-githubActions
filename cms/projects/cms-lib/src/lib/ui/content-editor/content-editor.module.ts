import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentEditorComponent } from './content-editor.component';
import { MatIconModule } from '@angular/material/icon';
import { LayoutSelectionPanelComponent } from './component/layout-selection-panel/layout-selection-panel.component';
import { TemplateInfoEditingPanelComponent } from './component/template-info-editing-panel/template-info-editing-panel.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
  ],
  declarations: [
    ContentEditorComponent,
    LayoutSelectionPanelComponent,
    TemplateInfoEditingPanelComponent,
  ],
  exports: [
    ContentEditorComponent,
  ]
})
export class ContentEditorModule { }
