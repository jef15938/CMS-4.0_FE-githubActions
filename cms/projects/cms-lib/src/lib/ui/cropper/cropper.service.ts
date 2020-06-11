import { Injectable } from '@angular/core';
import { ModalService } from '../modal/modal.service';
import { Observable } from 'rxjs';
import { CropperComponent } from './cropper.component';

@Injectable({
  providedIn: 'root'
})
export class CropperService {

  constructor(
    private _modalService: ModalService,
  ) { }

  openEditor(imgUrl: string, title?: string): Observable<any> {

    const modalSetting = {
      id: `cropper`,
      width: '100%',
      maxWidth: '100%',
      height: '100%',
    };

    return this._modalService.openComponent({
      component: CropperComponent,
      componentInitData: { imgUrl, title },
      modalSetting
    });
  }
}
