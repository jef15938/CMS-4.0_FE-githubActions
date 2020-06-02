import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from '../../../modal/custom-modal-base';

@Component({
  selector: 'cms-html-editor-insert-img-modal',
  templateUrl: './html-editor-insert-img-modal.component.html',
  styleUrls: ['./html-editor-insert-img-modal.component.scss']
})
export class HtmlEditorInsertImgModalComponent extends CustomModalBase implements OnInit {

  @ViewChild('Img') img: ElementRef<HTMLImageElement>;

  title = '';
  actions: CustomModalActionButton[];

  @Input() src = '';
  @Input() alt = '';
  @Input() width: number = null;
  @Input() height: number = null;

  constructor() { super(); }

  ngOnInit(): void {
  }

  checkWidthHeight() {
    setTimeout(() => {
      const img = this.img.nativeElement;
      this.width = img.width;
      this.height = img.height;
    }, 250)
  }

  confirm() {
    this.close({
      src: this.src,
      alt: this.alt,
      width: this.width,
      height: this.height,
    })
  }

}
