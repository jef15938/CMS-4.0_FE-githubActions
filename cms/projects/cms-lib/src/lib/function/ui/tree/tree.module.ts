import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { DynamicWrapperModule } from '@neux/core';
import { DirectiveModule } from './../../../global/directive';
import { TreeComponent } from './tree.component';
import { NodeRenderOnloadPipe } from './pipe/node-render-onload.pipe';
import { NodeCheckboxDisabledPipe } from './pipe/node-checkbox-disabled.pipe';
import { NodeCanDragPipe, NodeCanDropPipe } from './pipe/node-can-move.pipe';
import { NodeHidePipe } from './pipe/node-hide.pipe';

@NgModule({
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    DirectiveModule,
    DynamicWrapperModule,
  ],
  declarations: [
    TreeComponent,
    NodeRenderOnloadPipe,
    NodeCheckboxDisabledPipe,
    NodeCanDragPipe,
    NodeCanDropPipe,
    NodeHidePipe,
  ],
  exports: [
    TreeComponent
  ],
})
export class TreeModule { }
