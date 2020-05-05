import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightClickHandlerDirective } from './right-click-handler.directive';

const DIRECTIVES = [
  RightClickHandlerDirective
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
