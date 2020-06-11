import { Component, OnInit, Input } from '@angular/core';
import { ICropperOption } from '../../../cropper.type';

type AspectRatioMode = '16:9' | '4:3' | '3:2' | '1:1' | '2:3' | '9:16' | '3:4' | '9:16' | 'free';

@Component({
  selector: 'cms-cropper-menu-setting',
  templateUrl: './cropper-menu-setting.component.html',
  styleUrls: ['./cropper-menu-setting.component.scss']
})
export class CropperMenuSettingComponent implements OnInit {

  @Input() cropper: Cropper;
  options: ICropperOption;

  aspectRatioMode: AspectRatioMode = 'free';

  constructor() { }

  ngOnInit(): void {
    this.options = this.cropper['options'];
  }

  stopEvent(ev: MouseEvent) {
    this._evPreventDefaultAndStopPropagation(ev);
  }

  private _evPreventDefaultAndStopPropagation = (ev: MouseEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
  }

  setDragMode(dragMode: Cropper.DragMode) {
    this.cropper.setDragMode(dragMode);
  }

  aspectRatio(aspectRatioMode: AspectRatioMode) {
    this.aspectRatioMode = aspectRatioMode;
    if (aspectRatioMode === 'free') {
      this.cropper.setAspectRatio(+aspectRatioMode);
    } else {
      const [w, h] = aspectRatioMode.split(':');
      this.cropper.setAspectRatio(+w / +h);
    }
  }

  toggle(option: 'movable' | 'rotatable' | 'scalable' | 'zoomable') {
    this.options[option] = !this.options[option];
  }

}
