import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DynamicWrapperModule } from '@neux/core';
import { DirectiveModule } from './../../../global/directive';
import { TreeComponent } from './tree.component';
import { NodeRenderOnloadPipe } from './pipe/node-render-onload.pipe';

@NgModule({
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    DirectiveModule,
    DynamicWrapperModule,
  ],
  declarations: [
    TreeComponent,
    NodeRenderOnloadPipe,
  ],
  exports: [
    TreeComponent
  ],
})
export class TreeModule { }
