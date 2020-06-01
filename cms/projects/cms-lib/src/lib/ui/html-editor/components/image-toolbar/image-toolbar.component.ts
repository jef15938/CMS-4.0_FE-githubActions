import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cms-html-editor-image-toolbar',
  templateUrl: './image-toolbar.component.html',
  styleUrls: ['./image-toolbar.component.scss']
})
export class ImageToolbarComponent implements OnInit {

  @Input() selectedImg: HTMLImageElement;

  constructor() { }

  ngOnInit() {
    console.warn('height = ', this.selectedImg.height)
    console.warn('width = ', this.selectedImg.width)
  }

}
