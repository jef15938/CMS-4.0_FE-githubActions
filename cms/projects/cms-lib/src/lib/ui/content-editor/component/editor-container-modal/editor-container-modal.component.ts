import { Component, OnInit, Input } from '@angular/core';
import { ContentInfo } from '@cms-lib/neuxAPI/bean/ContentInfo';
import { TemplateGetResponse } from '@cms-lib/neuxAPI/bean/TemplateGetResponse';
import { CustomModalBase, CustomModalActionButton } from '@cms-lib/ui/modal';
import { ContentEditorSaveEvent, EditorMode } from './../../../content-editor/content-editor.interface';


@Component({
  selector: 'cms-editor-container-modal',
  templateUrl: './editor-container-modal.component.html',
  styleUrls: ['./editor-container-modal.component.scss']
})
export class EditorContainerModalComponent extends CustomModalBase implements OnInit {
  actions: CustomModalActionButton[];

  @Input() contentInfo: ContentInfo;
  @Input() mode: EditorMode = EditorMode.EDIT;
  @Input() selectableTemplates: TemplateGetResponse;

  private contentSaved = true;

  title: string | (() => string) = () => this.mode === EditorMode.INFO ? '版型規範' : '';

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
