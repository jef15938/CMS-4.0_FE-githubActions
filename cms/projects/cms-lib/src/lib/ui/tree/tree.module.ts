import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './tree.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { TreeNodeCustomWrapperDirective } from './tree-node-custom-wrapper.directive';

const COMPONENTS = [
  TreeComponent
];

@NgModule({
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
  ],
  declarations: [
    ...COMPONENTS,
    TreeNodeCustomWrapperDirective
  ],
  exports: [
    ...COMPONENTS
  ],
})
export class TreeModule { }
