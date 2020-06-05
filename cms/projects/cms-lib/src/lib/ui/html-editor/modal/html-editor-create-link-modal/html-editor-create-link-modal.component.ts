import { Component, OnInit, Input } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from '../../../modal/custom-modal-base';
import { stringify } from 'querystring';

@Component({
  selector: 'cms-html-editor-create-link-modal',
  templateUrl: './html-editor-create-link-modal.component.html',
  styleUrls: ['./html-editor-create-link-modal.component.scss']
})
export class HtmlEditorCreateLinkModalComponent extends CustomModalBase implements OnInit {

  title = '';
  actions: CustomModalActionButton[];

  @Input() aTag: HTMLAnchorElement;
  @Input() canModifyText: boolean;

  aTagConfig: {
    href: string;
    text: string;
    target: string;
  };

  constructor() { super(); }

  ngOnInit(): void {
    this.aTagConfig = {
      href: this.aTag.href,
      text: this.aTag.text,
      target: this.aTag.target,
    };
  }

  confirm() {
    this.close(this.aTagConfig);
  }

}
