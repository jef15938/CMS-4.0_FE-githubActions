import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsRoutingModule } from './cms-routing.module';
import { CmsComponent } from './cms.component';
import { CmsUserMenuResolver } from './cms-menu-resolver';
import { MenuNodeComponent } from './layouts/menu-node.component';
import { ModalModule } from '../ui/modal/modal.module';
import { SharedModule } from '../shared/shared.module';

const LAYOUTS = [
  MenuNodeComponent,
]

@NgModule({
  imports: [
    CommonModule,
    CmsRoutingModule,
    SharedModule,
  ],
  declarations: [
    CmsComponent,
    ...LAYOUTS
  ],
  providers: [
    CmsUserMenuResolver,
    ...(ModalModule.forRoot().providers)
  ]
})
export class CmsModule { }
