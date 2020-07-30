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

  openGallery(
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
