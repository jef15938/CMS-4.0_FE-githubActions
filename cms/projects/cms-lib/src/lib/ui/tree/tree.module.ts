import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { TreeComponent } from './tree.component';
import { TreeNodeCustomWrapperDirective } from './tree-node-custom-wrapper.directive';
import { DirectiveModule } from '@cms-lib/directive';

@NgModule({
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    DirectiveModule,
  ],
  declarations: [
    TreeComponent,
    TreeNodeCustomWrapperDirective
  ],
  exports: [
    TreeComponent
  ],
})
export class TreeModule { }
