import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService, ModalSetting } from '../../../ui/modal';
import { GallerySharedContainerModalComponent } from '../component/gallery-shared-container-modal/gallery-shared-container-modal.component';
import { GalleryFileType } from '../type/gallery-shared.type';
import { GalleryInfoModel } from '../../../../global/api/data-model/models/gallery-info.model';
import { GalleryAddUpdateModalComponent, GalleryType, UploadResponse } from '../component/gallery-add-update-modal/gallery-add-update-modal.component';

@Injectable({
  providedIn: 'root'
})
export class GallerySharedService {

  constructor(
    private modalService: ModalService,
  ) { }

  openImgGallery() {
    return this.openGalleryWithFileTypes(['png', 'jpg', 'jpeg', 'gif']);
  }

  openFileGallery() {
    return this.openGalleryWithFileTypes(['pdf', 'doc', 'docx', 'xls', 'xlsx']);
  }

  openGallery(types: GalleryFileType[] = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'png', 'jpg', 'jpeg', 'gif']) {
    return this.openGalleryWithFileTypes(types);
  }

  private openGalleryWithFileTypes(
    allowedFileTypes?: GalleryFileType[]
  ): Observable<GalleryInfoModel> {

    const modalSetting: ModalSetting = {
      id: `gallery-shared-modal-container`,
      width: '80%',
      maxWidth: '90%',
      height: '90%',
      hideCloseBtn: false,
    };

    return this.modalService.openComponent({
      component: GallerySharedContainerModalComponent,
      componentInitData: { allowedFileTypes },
      modalSetting
    });
  }

  private openGalleryAddUpdateModalComponent(config: {
    galleryType: GalleryType;
    galleryId?: string;
    galleryName?: string,
    accept?: string;
    imageHeightWidth?: {
      width: number;
      height: number;
    };
  }) {

    const modalSetting: ModalSetting = {
      id: `gallery-add-update-modal`,
      width: '80%',
      maxWidth: '90%',
    };

    const componentInitData: Partial<GalleryAddUpdateModalComponent> = {
      galleryType: config.galleryType,
      galleryId: config.galleryId,
      galleryName: config.galleryName,
      accept: config.accept,
      imageHeightWidth: config.imageHeightWidth,
    };

    return this.modalService.openComponent({
      component: GalleryAddUpdateModalComponent,
      componentInitData,
      modalSetting
    });
  }

  addGalleryImage(
    accept: string,
    imageHeightWidth: {
      width: number;
      height: number;
    }
  ): Observable<UploadResponse> {
    return this.openGalleryAddUpdateModalComponent({
      galleryType: GalleryType.IMAGE,
      accept,
      imageHeightWidth,
    });
  }

  updateGalleryImage(
    galleryId: string,
    galleryName: string,
    accept: string,
    imageHeightWidth: {
      width: number;
      height: number;
    }): Observable<UploadResponse> {
    return this.openGalleryAddUpdateModalComponent({
      galleryType: GalleryType.IMAGE,
      galleryId,
      galleryName,
      accept,
      imageHeightWidth,
    });
  }

  addGalleryFile(accept?: string): Observable<UploadResponse> {
    return this.openGalleryAddUpdateModalComponent({ galleryType: GalleryType.FILE, accept });
  }

  updateGalleryFile(
    galleryId: string,
    galleryName: string,
    accept: string,
  ): Observable<UploadResponse> {
    return this.openGalleryAddUpdateModalComponent({
      galleryType: GalleryType.FILE,
      galleryId,
      galleryName,
      accept,
    });
  }

}
