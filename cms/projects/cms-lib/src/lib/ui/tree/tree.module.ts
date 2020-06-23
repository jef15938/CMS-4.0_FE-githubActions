import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { DirectiveModule } from './../../directive';
import { TreeComponent } from './tree.component';
import { TreeNodeCustomWrapperDirective } from './tree-node-custom-wrapper.directive';

@NgModule({
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
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
