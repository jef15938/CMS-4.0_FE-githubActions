import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentEditorComponent } from './content-editor.component';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { LayoutControlPanelComponent } from './component/layout-control-panel/layout-control-panel.component';
import { ContentControlPanelComponent } from './component/content-control-panel/content-control-panel.component';
import { LayoutBaseModule } from 'layout';
import { FormsModule } from '@angular/forms';
import { ContentViewRendererComponent } from './component/content-view-renderer/content-view-renderer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatExpansionModule,
    LayoutBaseModule,
  ],
  declarations: [
    ContentEditorComponent,
    LayoutControlPanelComponent,
    ContentControlPanelComponent,
    ContentViewRendererComponent,
  ],
  exports: [
    ContentEditorComponent,
  ]
})
export class ContentEditorModule { }
