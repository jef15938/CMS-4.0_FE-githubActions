import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizerDirective } from './resize/resizer.directive';
import { RightClickHandlerDirective } from './right-click-handler/right-click-handler.directive';

const DIRECTIVES = [
  RightClickHandlerDirective,
  ResizerDirective,
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
