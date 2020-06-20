import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ICropperOption } from '../../../cropper.type';

@Component({
  selector: 'cms-cropper-menu-edit',
  templateUrl: './cropper-menu-edit.component.html',
  styleUrls: ['./cropper-menu-edit.component.scss']
})
export class CropperMenuEditComponent implements OnInit {

  @Input() cropper: Cropper;
  options: ICropperOption;

  constructor() { }

  ngOnInit(): void {
    // tslint:disable-next-line: no-string-literal
    this.options = this.cropper['options'];
  }

  stopEvent(ev: MouseEvent) {
    this.evPreventDefaultAndStopPropagation(ev);
  }

  private evPreventDefaultAndStopPropagation = (ev: MouseEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
  }

  scale(mode: 'h' | 'v') {
    const data = this.cropper.getData();
    if (mode === 'h') {
      this.cropper.scaleX(0 - data.scaleX);
    } else {
      this.cropper.scaleY(0 - data.scaleY);
    }
  }

  rotate(direction: 'l' | 'r') {
    if (direction === 'l') {
      this.cropper.rotate(-45);
    } else {
      this.cropper.rotate(45);
    }
  }

  clear() {
    this.cropper.clear();
  }

  reset() {
    this.cropper.reset();
  }

  crop() {
    this.cropper.crop();
  }

}
