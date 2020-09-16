import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService, ModalSetting } from '../../../ui/modal';
import { GallerySharedContainerModalComponent } from '../component/gallery-shared-container-modal/gallery-shared-container-modal.component';
import { GalleryFileType } from '../type/gallery-shared.type';
import { GalleryInfoModel } from '../../../../global/api/data-model/models/gallery-info.model';
import { AddGalleryModalComponent, GalleryType } from '../component/add-gallery-modal/add-gallery-modal.component';

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

  addGalleryImg() {
    const modalSetting: ModalSetting = {
      id: `add-gallery-modal`,
      // width: '80%',
      // maxWidth: '90%',
      // height: '90%',
    };

    return this.modalService.openComponent({
      component: AddGalleryModalComponent,
      componentInitData: {
        galleryType: GalleryType.IMAGE,
      },
      modalSetting
    });
  }

  addGalleryFile() {
    const modalSetting: ModalSetting = {
      id: `add-gallery-modal`,
      // width: '80%',
      // maxWidth: '90%',
      // height: '90%',
    };

    return this.modalService.openComponent({
      component: AddGalleryModalComponent,
      componentInitData: {
        galleryType: GalleryType.FILE,
      },
      modalSetting
    });
  }

}
