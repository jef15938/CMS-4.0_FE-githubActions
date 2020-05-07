import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightClickHandlerDirective } from './right-click-handler.directive';
import { ResizerDirective } from './resizer.directive';

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
