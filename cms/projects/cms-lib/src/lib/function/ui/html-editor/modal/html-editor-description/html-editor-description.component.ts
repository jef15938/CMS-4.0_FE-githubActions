import { Component, OnInit } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from '../../../modal';

@Component({
  selector: 'cms-html-editor-description',
  templateUrl: './html-editor-description.component.html',
  styleUrls: ['./html-editor-description.component.scss']
})
export class HtmlEditorDescriptionComponent extends CustomModalBase implements OnInit {

  title = '編輯器說明';
  actions: CustomModalActionButton[];

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
