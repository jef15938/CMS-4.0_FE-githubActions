import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsRoutingModule } from './cms-routing.module';
import { CmsComponent } from './cms.component';
import { CmsUserMenuResolver } from './cms-menu-resolver';
import { MenuNodeComponent } from './layouts/menu-node.component';

const LAYOUTS = [
  MenuNodeComponent,
]

@NgModule({
  imports: [
    CommonModule,
    CmsRoutingModule
  ],
  declarations: [
    CmsComponent,
    ...LAYOUTS
  ],
  providers: [
    CmsUserMenuResolver
  ]
})
export class CmsModule { }
