import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from '../../../modal/custom-modal-base';

@Component({
  selector: 'cms-html-editor-insert-table-modal',
  templateUrl: './html-editor-insert-table-modal.component.html',
  styleUrls: ['./html-editor-insert-table-modal.component.scss']
})
export class HtmlEditorInsertTableModalComponent extends CustomModalBase implements OnInit {

  @ViewChild('Table') table: ElementRef<HTMLTableElement>;

  title = '';
  actions: CustomModalActionButton[];

  @Input() src = '';
  @Input() alt = '';
  @Input() width: number = null;
  @Input() height: number = null;

  constructor() { super(); }

  ngOnInit(): void {
    this.src = this.src || '';
    this.alt = this.alt || '';
    this.width = this.width || null;
    this.height = this.height || null;
  }

  checkWidthHeight() {
    setTimeout(() => {
      const table = this.table.nativeElement;
      // this.width = table.width;
      // this.height = table.height;
    }, 250)
  }

  confirm() {
    this.close({
      src: this.src || '',
      alt: this.alt || '',
      width: this.width || null,
      height: this.height || null,
    })
  }

}
