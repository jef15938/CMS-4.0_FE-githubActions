import { Component, OnInit, Input } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from './../../modal/custom-modal-base';

@Component({
  selector: 'cms-editor-container-modal',
  templateUrl: './editor-container-modal.component.html',
  styleUrls: ['./editor-container-modal.component.scss']
})
export class EditorContainerModalComponent extends CustomModalBase implements OnInit {
  @Input() title: string | (() => string) = '';
  actions: CustomModalActionButton[];

  @Input() content: string;

  constructor() { super(); }

  ngOnInit(): void {
    this.modalRef.addPanelClass('cms-editor-container-modal');
  }

  close() {
    // alert('Modal close()');
    super.close();
  }

  save(event) {
    event.editorSave();
    alert('saved');
  }

}
