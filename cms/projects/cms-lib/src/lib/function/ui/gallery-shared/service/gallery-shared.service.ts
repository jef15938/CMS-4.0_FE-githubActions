import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ModalService } from '../../../ui/modal';
import { GallerySharedContainerModalComponent } from '../component/gallery-shared-container-modal/gallery-shared-container-modal.component';

@Injectable({
  providedIn: 'root'
})
export class GallerySharedService {

  constructor(
    private modalService: ModalService,
  ) { }

  openGallery(
    config?: { title?: string }
  ): Observable<any> {
    const title = config?.title;
    // const content = config?.content;

    const modalSetting = {
      id: `gallery-shared`,
      width: '80%',
      maxWidth: '80%',
      height: '80%',
    };

    return this.modalService.openComponent({
      component: GallerySharedContainerModalComponent,
      componentInitData: { title },
      modalSetting
    });
  }

}
