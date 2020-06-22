import { Component, OnInit, Input, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CropperComponent as CropperWrapper } from 'angular-cropperjs';
import { CustomModalBase, CustomModalActionButton } from '@cms-lib/ui/modal';
import { CropperOption } from './cropper.type';

@Component({
  selector: 'cms-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss']
})
export class CropperComponent extends CustomModalBase implements OnInit, AfterViewInit {

  @Input() title: string | (() => string) = '';
  actions: CustomModalActionButton[];

  @ViewChild(CropperWrapper) cropperWrapper: CropperWrapper;
  private get cropper() { return this.cropperWrapper.cropper; }

  @Input() imgUrl = '';

  cropperOption: CropperOption = {
    checkCrossOrigin: false,
    movable: true,
    scalable: true,
    zoomable: true,
    autoCropArea: 1,
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

  onImageLoaded(ev) {
    console.warn('onImageLoaded() ev = ', ev);
  }

  confirm() {
    this.cropper.crop();
    const dataUrl = this.cropper.getCroppedCanvas().toDataURL();
    this.cropper.destroy();
    this.close(dataUrl);
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
