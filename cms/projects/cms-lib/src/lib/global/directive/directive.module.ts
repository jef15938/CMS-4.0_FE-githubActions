import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizerDirective } from './resize/resizer.directive';
import { RightClickHandlerDirective } from './right-click-handler/right-click-handler.directive';
import { TableResizerDirective } from './resize/table-resizer.directive';

const DIRECTIVES = [
  RightClickHandlerDirective,
  ResizerDirective,
  TableResizerDirective,
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ...DIRECTIVES
  ],
  exports: [
    ...DIRECTIVES
  ]
})
export class DirectiveModule { }
