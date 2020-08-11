import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService, ModalSetting } from '../modal';
import { CropperComponent } from './cropper.component';

@Injectable({
  providedIn: 'root'
})
export class CropperService {

  constructor(
    private modalService: ModalService,
  ) { }

  openEditor(imgUrl: string, title?: string): Observable<any> {

    const modalSetting: ModalSetting = {
      id: `cropper`,
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      hideCloseBtn: true,
    };

    return this.modalService.openComponent({
      component: CropperComponent,
      componentInitData: { imgUrl, title },
      modalSetting
    }, true);
  }
}
