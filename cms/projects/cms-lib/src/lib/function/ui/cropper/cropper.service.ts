import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService, ModalSetting } from '../modal';
import { CropperComponent } from './cropper.component';

export interface CropSetting {
  data: {
    height: number;
    rotate: number;
    scaleX: number;
    scaleY: number;
    width: number;
    x: number;
    y: number;
  };

  imageData: {
    aspectRatio: number;
    height: number;
    left: number
    naturalHeight: number
    naturalWidth: number
    top: number
    width: number
  };

  canvasData: {
    height: number;
    left: number;
    naturalHeight: number;
    naturalWidth: number;
    top: number;
    width: number;
  };

  containerData: {
    height: number;
    width: number;
  };

  cropBoxData: {
    height: number;
    left: number;
    top: number;
    width: number;
  };
}

export interface CropResult {
  dataUrl: string;
  cropSetting: CropSetting;
}

@Injectable({
  providedIn: 'root'
})
export class CropperService {

  constructor(
    private modalService: ModalService,
  ) { }

  openEditor(imgUrl: string, config?: {
    cropSetting?: CropSetting;
    imageHeightWidth?: {
      width: number;
      height: number;
    }
  }): Observable<CropResult> {

    const modalSetting: ModalSetting = {
      id: `cropper`,
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      hideCloseBtn: true,
    };

    const cropSetting = config?.cropSetting || null;

    const imageHeightWidth =
      config?.imageHeightWidth?.height > 0 && config?.imageHeightWidth?.height > 0
        ? config.imageHeightWidth : null;

    return this.modalService.openComponent({
      component: CropperComponent,
      componentInitData: { imgUrl, cropSetting, imageHeightWidth },
      modalSetting
    }, true);
  }
}
