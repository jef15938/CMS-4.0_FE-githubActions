import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestRoutingModule } from './test-routing.module';
import { Test1Component } from './test1.component';
import { Test2Component } from './test2.component';

@NgModule({
  declarations: [
    Test1Component,
    Test2Component,
  ],
  imports: [
    CommonModule,
    TestRoutingModule
  ]
})
export class TestModule { }
