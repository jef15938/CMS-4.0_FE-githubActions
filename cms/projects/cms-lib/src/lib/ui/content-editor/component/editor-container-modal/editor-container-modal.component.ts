import { Component, OnInit, Input } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from './../../../../ui/modal/custom-modal-base';
import { ContentEditorSaveEvent, EditorMode } from './../../../../ui/content-editor/content-editor.interface';
import { ContentInfo } from './../../../../neuxAPI/bean/ContentInfo';
import { TemplateGetResponse } from './../../../../neuxAPI/bean/TemplateGetResponse';

@Component({
  selector: 'cms-editor-container-modal',
  templateUrl: './editor-container-modal.component.html',
  styleUrls: ['./editor-container-modal.component.scss']
})
export class EditorContainerModalComponent extends CustomModalBase implements OnInit {
  title: string | (() => string) = () => this.mode === EditorMode.INFO ? '版型規範' : '';
  actions: CustomModalActionButton[];

  @Input() contentInfo: ContentInfo;
  @Input() mode: EditorMode = EditorMode.EDIT;
  @Input() selectableTemplates: TemplateGetResponse;

  private contentSaved = true;

  constructor() { super(); }

  ngOnInit(): void {
    this.modalRef.addPanelClass('cms-content-editor-container-modal');
  }

  close() {
    // alert('Modal close()');
    super.close();
  }

  save(event: ContentEditorSaveEvent) {
    event.editorSave();
    alert('saved');
  }

}
