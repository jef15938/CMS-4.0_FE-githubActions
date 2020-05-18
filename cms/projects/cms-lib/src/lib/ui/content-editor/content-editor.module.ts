import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentEditorComponent } from './content-editor.component';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { LayoutControlPanelComponent } from './component/layout-control-panel/layout-control-panel.component';
import { ContentControlPanelComponent } from './component/content-control-panel/content-control-panel.component';
import { LayoutModule } from 'layout';
import { FormsModule } from '@angular/forms';
import { ContentViewRendererComponent } from './component/content-view-renderer/content-view-renderer.component';
import { AddTemplateButtonComponent } from './component/add-template-button/add-template-button.component';
import { MatMenuModule } from '@angular/material/menu';
import { TemplateControlTabComponent } from './component/content-control-panel/control/template/template-control-tab/template-control-tab.component';
import { MatListModule } from '@angular/material/list';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatExpansionModule,
    MatMenuModule,
    MatListModule,
    DragDropModule,
    LayoutModule,
  ],
  declarations: [
    ContentEditorComponent,
    LayoutControlPanelComponent,
    ContentControlPanelComponent,
    ContentViewRendererComponent,
    AddTemplateButtonComponent,
    TemplateControlTabComponent,
  ],
  exports: [
    ContentEditorComponent,
  ]
})
export class ContentEditorModule { }
