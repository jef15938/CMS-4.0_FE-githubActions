// angular
import { NgModule } from '@angular/core';
// CMS
import { SharedModule } from '../../shared/shared.module';
// Galley
import { GallerySharedComponent } from './component/gallery-shared/gallery-shared.component';
import { GalleryCategoryNodeComponent } from './component/gallery-category-node/gallery-category-node.component';
import { GalleryCategoryMaintainModalComponent } from './component/gallery-category-maintain-modal/gallery-category-maintain-modal.component';
import { GalleryActionCellComponent } from './component/gallery-action-cell/gallery-action-cell.component';
import { GalleryInfoCellComponent } from './component/gallery-info-cell/gallery-info-cell.component';
import { UploadGalleryModalComponent } from './component/upload-gallery-modal/upload-gallery-modal.component';
import { UploadGalleryActionCellComponent } from './component/upload-gallery-action-cell/upload-gallery-action-cell.component';
import { GelleryImgSrcPipe } from './pipe/gallery-img-src.pipe';
import { GallerySharedContainerModalComponent } from './component/gallery-shared-container-modal/gallery-shared-container-modal.component';
import { GellerySizePipe } from './pipe/gallery-size.pipe';
import { UploadGalleryInfoCellComponent } from './component/upload-gallery-info-cell/upload-gallery-info-cell.component';
import { UploadGalleryProgressCellComponent } from './component/upload-gallery-progress-cell/upload-gallery-progress-cell.component';
import { GalleryAddUpdateModalComponent } from './component/gallery-add-update-modal/gallery-add-update-modal.component';

const COMPONENTS_PIPES = [
  GallerySharedComponent,
  GallerySharedContainerModalComponent,
  GalleryCategoryNodeComponent,
  GalleryCategoryMaintainModalComponent,
  GalleryActionCellComponent,
  GalleryInfoCellComponent,
  UploadGalleryModalComponent,
  GalleryAddUpdateModalComponent,
  UploadGalleryActionCellComponent,
  UploadGalleryInfoCellComponent,
  UploadGalleryProgressCellComponent,
  GelleryImgSrcPipe,
  GellerySizePipe,
];

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    ...COMPONENTS_PIPES
  ],
  exports: [
    GallerySharedComponent
  ]
})
export class GallerySharedModule { }
