import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './tree.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { TreeNodeCustomWrapperDirective } from './tree-node-custom-wrapper.directive';
import { DirectiveModule } from '../../directive/directive.module';

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
