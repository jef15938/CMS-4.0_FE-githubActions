import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentEditorComponent } from './content-editor.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
  ],
  declarations: [
    ContentEditorComponent,
  ],
  exports: [
    ContentEditorComponent,
  ]
})
export class ContentEditorModule { }
