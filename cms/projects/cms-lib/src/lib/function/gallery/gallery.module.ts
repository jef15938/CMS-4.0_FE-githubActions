import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';
import { GalleryCategoryNodeComponent } from './component/node/gallery-category-node/gallery-category-node.component';
import { GalleryCategoryMaintainModalComponent } from './component/modal/gallery-category-maintain-modal/gallery-category-maintain-modal.component';
import { UploadGalleryModalComponent } from './component/modal/upload-gallery-modal/upload-gallery-modal.component';
import { GalleryActionCellComponent } from './component/cell/gallery-action-cell/gallery-action-cell.component';
import { GalleryInfoCellComponent } from './component/cell/gallery-info-cell/gallery-info-cell.component';
import { GelleryImgSrcPipe } from './pipe/gallery-img-src.pipe';

@NgModule({
  imports: [
    SharedModule,
    GalleryRoutingModule,
  ],
  declarations: [
    GalleryComponent,
    GalleryCategoryNodeComponent,
    GalleryCategoryMaintainModalComponent,
    UploadGalleryModalComponent,
    GalleryActionCellComponent,
    GalleryInfoCellComponent,
    GelleryImgSrcPipe,
  ],
})
export class GalleryModule { }
