import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from '../../../modal';

@Component({
  selector: 'cms-html-editor-insert-table-modal',
  templateUrl: './html-editor-insert-table-modal.component.html',
  styleUrls: ['./html-editor-insert-table-modal.component.scss']
})
export class HtmlEditorInsertTableModalComponent extends CustomModalBase implements OnInit {

  @ViewChild('Table') table: ElementRef<HTMLTableElement>;

  title = '表格設定';
  actions: CustomModalActionButton[];

  @Input() rows: number = null;
  @Input() cols: number = null;

  constructor() { super(); }

  ngOnInit(): void {
    this.rows = this.rows || 8;
    this.cols = this.cols || 8;
  }

  confirm() {
    this.close({
      rows: this.rows || null,
      cols: this.cols || null,
    });
  }

}
