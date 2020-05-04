import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabFrameComponent } from './tab-frame/tab-frame.component';
import { TabItemComponent } from './tab-item/tab-item.component';
import { TabDemoComponent } from './tab-demo/tab-demo.component';
import { LayoutBaseModule } from '../layout-base/layout-base.module';


@NgModule({
  declarations: [TabFrameComponent, TabItemComponent, TabDemoComponent],
  imports: [
    CommonModule,
    LayoutBaseModule
  ],
  exports: [
    TabFrameComponent,
    TabItemComponent,
    TabDemoComponent
  ]
})
export class TabModule {

}
