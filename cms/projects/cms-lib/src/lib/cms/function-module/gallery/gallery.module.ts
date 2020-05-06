import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';
import { SharedModule } from 'projects/cms-lib/src/lib/shared/shared.module';
import { GalleryCategoryNodeComponent } from './component/node/gallery-category-node/gallery-category-node.component';
import { GalleryCategoryMaintainModalComponent } from './component/modal/gallery-category-maintain-modal/gallery-category-maintain-modal.component';

@NgModule({
  imports: [
    CommonModule,
    GalleryRoutingModule,
    SharedModule
  ],
  declarations: [
    GalleryComponent,
    GalleryCategoryNodeComponent,
    GalleryCategoryMaintainModalComponent,
  ],
})
export class GalleryModule { }
