import { Component, OnInit, Input } from '@angular/core';
import { ContentInfo } from '../../../../neuxAPI/bean/ContentInfo';
import { TemplateGetResponse } from '../../../../neuxAPI/bean/TemplateGetResponse';
import { CustomModalBase, CustomModalActionButton } from '../../../modal';
import { ContentEditorSaveEvent, EditorMode } from '../../content-editor.interface';


@Component({
  selector: 'cms-content-editor-container-modal',
  templateUrl: './content-editor-container-modal.component.html',
  styleUrls: ['./content-editor-container-modal.component.scss']
})
export class ContentEditorContainerModalComponent extends CustomModalBase implements OnInit {
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
