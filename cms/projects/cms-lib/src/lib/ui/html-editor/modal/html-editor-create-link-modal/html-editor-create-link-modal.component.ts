import { Component, OnInit, Input } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from '../../../modal/custom-modal-base';

@Component({
  selector: 'cms-html-editor-create-link-modal',
  templateUrl: './html-editor-create-link-modal.component.html',
  styleUrls: ['./html-editor-create-link-modal.component.scss']
})
export class HtmlEditorCreateLinkModalComponent extends CustomModalBase implements OnInit {

  title = '';
  actions: CustomModalActionButton[];

  @Input() isSelectionInSameNode = true;
  @Input() url = '';
  @Input() text = '';
  @Input() isTargetBlank = true;

  constructor() { super(); }

  ngOnInit(): void {
  }

  confirm() {
    this.close({
      url: this.url,
      text: this.text,
      isTargetBlank: this.isTargetBlank,
    })
  }

}
