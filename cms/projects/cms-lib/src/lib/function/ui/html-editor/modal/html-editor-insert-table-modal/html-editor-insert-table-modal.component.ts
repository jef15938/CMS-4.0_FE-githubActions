import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CustomModalBase, ModalService } from '../../../modal';

export interface HtmlEditorInsertTableModalResponse {
  rows: number;
  cols: number;
}

@Component({
  selector: 'cms-html-editor-insert-table-modal',
  templateUrl: './html-editor-insert-table-modal.component.html',
  styleUrls: ['./html-editor-insert-table-modal.component.scss']
})
export class HtmlEditorInsertTableModalComponent
  extends CustomModalBase<HtmlEditorInsertTableModalComponent, HtmlEditorInsertTableModalResponse>
  implements OnInit {

  @ViewChild('Table') table: ElementRef<HTMLTableElement>;

  title = '表格設定';

  @Input() rows: number = null;
  @Input() cols: number = null;

  constructor(
    private modalService: ModalService,
  ) { super(); }

  ngOnInit(): void {
    this.rows = this.rows || 3;
    this.cols = this.cols || 3;
  }

  confirm() {
    if (this.rows > 15 || this.cols > 15) {
      this.modalService.openMessage({ message: '表格行列皆不能超過15行或列' }).subscribe();
      return;
    }
    this.close({
      rows: this.rows || null,
      cols: this.cols || null,
    });
  }

}
