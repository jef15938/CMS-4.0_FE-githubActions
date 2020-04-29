import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './tree.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';

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
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ],
})
export class TreeModule { }
