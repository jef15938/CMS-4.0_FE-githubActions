import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { DirectiveModule } from './../../../global/directive';
import { TreeComponent } from './tree.component';
import { MatButtonModule } from '@angular/material/button';
import { NodeRenderOnloadPipe } from './pipe/node-render-onload.pipe';
import { DynamicWrapperModule } from '@neux/core';

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
