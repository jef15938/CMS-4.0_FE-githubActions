import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from '../../modal';
import { HtmlEditorComponent } from '../html-editor.component';

@Component({
  selector: 'cms-html-editor-container-modal',
  templateUrl: './html-editor-container-modal.component.html',
  styleUrls: ['./html-editor-container-modal.component.scss']
})
export class HtmlEditorContainerModalComponent extends CustomModalBase implements OnInit {

  @ViewChild(HtmlEditorComponent) htmlEditorComponent: HtmlEditorComponent;

  @Input() title: string | (() => string) = '';
  actions: CustomModalActionButton[];

  @Input() content: string;

  constructor() { super(); }

  ngOnInit(): void {
    this.modalRef.addPanelClass('cms-html-editor-container-modal');
  }

  confirm() {
    const content = this.htmlEditorComponent.getContent();
    this.close(content);
  }

}
