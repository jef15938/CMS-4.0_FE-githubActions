import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabFrameComponent } from './tab-frame/tab-frame.component';
import { TabItemComponent } from './tab-item/tab-item.component';
import { TabDemoComponent } from './tab-demo/tab-demo.component';
import { WrapperModule } from '../../wrapper/wrapper.module';


@NgModule({
  declarations: [TabFrameComponent, TabItemComponent, TabDemoComponent],
  imports: [
    CommonModule,
    WrapperModule
  ],
  exports: [
    TabFrameComponent,
    TabItemComponent,
    TabDemoComponent
  ]
})
export class TabModule {

}
