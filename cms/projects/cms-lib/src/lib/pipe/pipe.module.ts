import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from './safe-html.pipe';
import { SafeResourcePipe } from './safe-resource.pipe';

const PIPES = [
  SafeHtmlPipe,
  SafeResourcePipe,
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ...PIPES
  ],
  exports: [
    ...PIPES
  ],
})
export class PipeModule { }
