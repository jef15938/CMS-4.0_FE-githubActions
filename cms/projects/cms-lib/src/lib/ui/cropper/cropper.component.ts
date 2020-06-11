import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from '../modal/custom-modal-base';
import { CropperComponent as Cropper } from 'angular-cropperjs';
import { ICropperOption } from './cropper.type';

@Component({
  selector: 'cms-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss']
})
export class CropperComponent extends CustomModalBase implements OnInit, AfterViewInit {

  @Input() title: string | (() => string) = '';
  actions: CustomModalActionButton[];

  @ViewChild(Cropper) cropper: Cropper;

  @Input() imgUrl = '';

  cropperOption: ICropperOption = {
    autoCrop: false,
    autoCropArea: 1,
  };

  ngOnInit(): void {
    this.modalRef.addPanelClass('cms-cropper-modal');
  }

  ngAfterViewInit(): void {

  }

  onImageLoaded(ev) {
    console.warn('onImageLoaded() ev = ', ev);
  }

  confirm() {
    const cropper = this.cropper.cropper;
    cropper.crop();
    const dataUrl = cropper.getCroppedCanvas().toDataURL();
    this.close(dataUrl);
  }

}
