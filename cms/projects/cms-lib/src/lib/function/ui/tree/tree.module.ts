import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { DirectiveModule } from './../../../global/directive';
import { TreeComponent } from './tree.component';
import { TreeNodeCustomWrapperDirective } from './tree-node-custom-wrapper.directive';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    DirectiveModule,
  ],
  declarations: [
    TreeNodeCustomWrapperDirective,
    TreeComponent,
  ],
  exports: [
    TreeComponent
  ],
})
export class TreeModule { }
