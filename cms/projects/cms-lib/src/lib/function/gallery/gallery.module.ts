import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './component/gallery/gallery.component';
import { GalleryCategoryNodeComponent } from './component/gallery-category-node/gallery-category-node.component';
import { GalleryCategoryMaintainModalComponent } from './component/gallery-category-maintain-modal/gallery-category-maintain-modal.component';
import { UploadGalleryModalComponent } from './component/upload-gallery-modal/upload-gallery-modal.component';
import { GalleryActionCellComponent } from './component/gallery-action-cell/gallery-action-cell.component';
import { GalleryInfoCellComponent } from './component/gallery-info-cell/gallery-info-cell.component';
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
