import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsRoutingModule } from './cms-routing.module';
import { CmsComponent } from './cms.component';
import { CmsUserMenuResolver } from './cms-menu-resolver';
import { MenuNodeComponent } from './layouts/menu-node.component';
import { DialogModule } from '../ui/dialog/dialog.module';

const LAYOUTS = [
  MenuNodeComponent,
]

@NgModule({
  imports: [
    CommonModule,
    CmsRoutingModule,
    DialogModule,
  ],
  declarations: [
    CmsComponent,
    ...LAYOUTS
  ],
  providers: [
    CmsUserMenuResolver,
    ...(DialogModule.forRoot().providers)
  ]
})
export class CmsModule { }
