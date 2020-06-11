import { Component, OnInit, Input, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from '../modal/custom-modal-base';
import { CropperComponent as CropperWrapper } from 'angular-cropperjs';
import { ICropperOption } from './cropper.type';

@Component({
  selector: 'cms-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss']
})
export class CropperComponent extends CustomModalBase implements OnInit, AfterViewInit {

  @Input() title: string | (() => string) = '';
  actions: CustomModalActionButton[];

  @ViewChild(CropperWrapper) cropperWrapper: CropperWrapper;
  private get _cropper() { return this.cropperWrapper.cropper; }

  @Input() imgUrl = '';

  cropperOption: ICropperOption = {
    checkCrossOrigin: false,
    movable: true,
    scalable: true,
    zoomable: true,
    autoCropArea: 1,
  };

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
  ) {
    super();
  }

  ngOnInit(): void {
    this.modalRef.addPanelClass('cms-cropper-modal');
  }

  ngAfterViewInit(): void {
    this._changeDetectorRef.detectChanges();
  }

  onImageLoaded(ev) {
    console.warn('onImageLoaded() ev = ', ev);
  }

  confirm() {
    this._cropper.crop();
    const dataUrl = this._cropper.getCroppedCanvas().toDataURL();
    this._cropper.destroy();
    this.close(dataUrl);
  }

  showInfo() {
    console.log('--------------------------------------');
    console.warn('this.cropperWrapper = ', this.cropperWrapper);
    console.warn('this._cropper = ', this._cropper);
    console.warn('getData() = ', this._cropper.getData());
    console.warn('getImageData() = ', this._cropper.getImageData());
    console.warn('getCanvasData() = ', this._cropper.getCanvasData());
    console.warn('getContainerData() = ', this._cropper.getContainerData());
    console.warn('getCropBoxData() = ', this._cropper.getCropBoxData());
  }

}
