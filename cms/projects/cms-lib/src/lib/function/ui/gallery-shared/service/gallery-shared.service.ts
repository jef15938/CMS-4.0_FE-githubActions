import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from '../../../ui/modal';
import { GallerySharedContainerModalComponent } from '../component/gallery-shared-container-modal/gallery-shared-container-modal.component';
import { GalleryFileType } from '../type/gallery-shared.type';

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

  openGallery() {
    return this.openGalleryWithFileTypes();
  }

  private openGalleryWithFileTypes(
    allowedFileTypes?: GalleryFileType[]
  ): Observable<any> {

    const modalSetting = {
      id: `gallery-shared`,
      width: '80%',
      maxWidth: '80%',
      height: '80%',
    };

    return this.modalService.openComponent({
      component: GallerySharedContainerModalComponent,
      componentInitData: { allowedFileTypes },
      modalSetting
    });
  }

}
