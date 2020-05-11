import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentEditorComponent } from './content-editor.component';
import { MatIconModule } from '@angular/material/icon';
import { LayoutControlPanelComponent } from './component/layout-control-panel/layout-control-panel.component';
import { ContentControlPanelComponent } from './component/content-control-panel/content-control-panel.component';
import { LayoutBaseModule } from 'layout';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    LayoutBaseModule,
  ],
  declarations: [
    ContentEditorComponent,
    LayoutControlPanelComponent,
    ContentControlPanelComponent,
  ],
  exports: [
    ContentEditorComponent,
  ]
})
export class ContentEditorModule { }
