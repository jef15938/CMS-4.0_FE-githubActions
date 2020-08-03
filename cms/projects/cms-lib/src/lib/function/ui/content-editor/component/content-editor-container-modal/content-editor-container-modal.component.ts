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
  title = '';
  actions: CustomModalActionButton[];

  @Input() contentID: string;
  @Input() controlID: string;
  @Input() content: ContentInfo;
  @Input() editorMode: EditorMode = EditorMode.EDIT;
  @Input() onSaved: () => void;

  templates: TemplateGetResponse;

  constructor(
    private contentService: ContentService,
  ) { super(); }

  ngOnInit(): void {
    this.modalRef.addPanelClass('cms-content-editor-container-modal');
    console.warn('this.content = ', this.content);
    if (!this.content) {
      this.contentService.getContentById(this.contentID).subscribe(content => this.content = content);
    }

    if (this.editorMode === EditorMode.EDIT) {
      this.contentService.getTemplateByControlID(this.controlID).subscribe(templates => this.templates = templates);
    }

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
