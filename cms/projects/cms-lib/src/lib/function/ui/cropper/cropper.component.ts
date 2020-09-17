import { Component, OnInit, Input, ViewChild, AfterViewInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { CropperComponent as CropperWrapper } from 'angular-cropperjs';
import { CustomModalBase, CustomModalActionButton } from '../modal';
import { CropperOption } from './cropper.type';
import { CropSetting, CropResult } from './cropper.service';

@Component({
  selector: 'cms-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss']
})
export class CropperComponent extends CustomModalBase implements OnInit, AfterViewInit, AfterViewChecked {

  @Input() title: string | (() => string) = '';
  actions: CustomModalActionButton[];

  @ViewChild(CropperWrapper) cropperWrapper: CropperWrapper;
  private get cropper() { return this.cropperWrapper.cropper; }

  @Input() imgUrl = '';
  @Input() cropSetting: CropSetting;

  private isSettingInit = false;

  cropperOption: CropperOption = {
    checkCrossOrigin: false,
    movable: true,
    scalable: true,
    zoomable: true,
    autoCropArea: 1,
    viewMode: 0,
  };

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    super();
  }

  ngOnInit(): void {
    this.modalRef.addPanelClass('cms-cropper-modal');
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngAfterViewChecked(): void {
    this.initCropSetting();
  }

  private initCropSetting() {
    if (this.isSettingInit) { return; }
    if (this.cropSetting && this.cropper) {
      try {
        const { data, canvasData, containerData, cropBoxData, imageData } = this.cropSetting;
        this.cropper.setData(data);
        this.cropper.setCanvasData(canvasData);
        this.cropper.setCropBoxData(cropBoxData);
        this.isSettingInit = true;
      } catch (error) {
        console.error(error);
      }
    }
  }

  onImageLoaded(ev) {
    console.warn('onImageLoaded() ev = ', ev);
  }

  confirm() {
    this.cropper.crop();
    const cropSetting = this.exportCropSetting();
    const dataUrl = this.cropper.getCroppedCanvas().toDataURL();
    this.cropper.destroy();
    const result: CropResult = { dataUrl, cropSetting };
    this.close(result);
  }

  private exportCropSetting(): CropSetting {
    return {
      data: { ...this.cropper.getData() },
      imageData: { ...this.cropper.getImageData() },
      canvasData: { ...this.cropper.getCanvasData() },
      containerData: { ...this.cropper.getContainerData() },
      cropBoxData: { ...this.cropper.getCropBoxData() },
    };
  }

  showInfo() {
    console.log('--------------------------------------');
    console.warn('this.cropperWrapper = ', this.cropperWrapper);
    console.warn('this.cropper = ', this.cropper);
    console.warn('getData() = ', this.cropper.getData());
    console.warn('getImageData() = ', this.cropper.getImageData());
    console.warn('getCanvasData() = ', this.cropper.getCanvasData());
    console.warn('getContainerData() = ', this.cropper.getContainerData());
    console.warn('getCropBoxData() = ', this.cropper.getCropBoxData());
  }

}
