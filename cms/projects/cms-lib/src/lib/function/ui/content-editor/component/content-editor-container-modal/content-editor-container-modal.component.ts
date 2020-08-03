import { Component, OnInit, Input } from '@angular/core';
import { ContentInfo } from './../../../../../global/api/neuxAPI/bean/ContentInfo';
import { TemplateGetResponse } from './../../../../../global/api/neuxAPI/bean/TemplateGetResponse';
import { CustomModalBase, CustomModalActionButton } from '../../../modal';
import { ContentEditorSaveEvent, EditorMode } from '../../content-editor.interface';
import { ContentService } from '../../../../../global/api/service';

@Component({
  selector: 'cms-content-editor-container-modal',
  templateUrl: './content-editor-container-modal.component.html',
  styleUrls: ['./content-editor-container-modal.component.scss']
})
export class ContentEditorContainerModalComponent extends CustomModalBase implements OnInit {
  actions: CustomModalActionButton[];

  @Input() contentID: string;
  @Input() contentInfo: ContentInfo;
  @Input() editorMode: EditorMode = EditorMode.EDIT;
  @Input() selectableTemplates: TemplateGetResponse;
  @Input() onSaved: () => void;

  title: string | (() => string) = () => this.editorMode === EditorMode.INFO ? '版型規範' : '';

  constructor(
    private contentService: ContentService,
  ) { super(); }

  ngOnInit(): void {
    this.modalRef.addPanelClass('cms-content-editor-container-modal');
  }

  close(currentContentInfo: ContentInfo) {
    super.close(currentContentInfo);
  }

  save(event: ContentEditorSaveEvent) {
    if (!this.contentID) { return; }
    event.editorSave();
    this.contentService.updateContent(this.contentID, event.contentInfo).subscribe(_ => {
      alert('內容儲存成功');
      if (this.onSaved) {
        this.onSaved();
      }
    }, err => {
      alert('內容儲存失敗');
      console.error('內容儲存失敗', err);
    });
  }

}
