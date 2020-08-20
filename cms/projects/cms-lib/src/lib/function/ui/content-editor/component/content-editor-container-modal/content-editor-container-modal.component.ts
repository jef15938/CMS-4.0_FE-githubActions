import { Component, OnInit, Input } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from '../../../modal';
import { ContentEditorSaveEvent, EditorMode } from '../../content-editor.interface';
import { ContentService } from '../../../../../global/api/service';
import { TemplateGetResponseModel } from '../../../../../global/api/data-model/models/template-get-response.model';
import { ContentInfoModel } from '../../../../../global/api/data-model/models/content-info.model';

@Component({
  selector: 'cms-content-editor-container-modal',
  templateUrl: './content-editor-container-modal.component.html',
  styleUrls: ['./content-editor-container-modal.component.scss']
})
export class ContentEditorContainerModalComponent extends CustomModalBase implements OnInit {
  title = '';
  actions: CustomModalActionButton[];

  @Input() contentID?: string;
  @Input() controlID?: string;
  @Input() content?: ContentInfoModel;
  @Input() editorMode: EditorMode = EditorMode.EDIT;
  @Input() onSaved: () => void;

  templates: TemplateGetResponseModel;

  constructor(
    private contentService: ContentService,
  ) { super(); }

  ngOnInit(): void {
    this.modalRef.addPanelClass([`cms-content-editor-container-modal`, `mode-${this.editorMode}`]);
    if (this.contentID) {
      this.contentService.getContentById(this.contentID).subscribe(content => this.content = content);
    }

    if (this.editorMode === EditorMode.EDIT) {
      this.contentService.getTemplateByControlID(this.controlID).subscribe(templates => this.templates = templates);
    }

  }

  close(currentContentInfo: ContentInfoModel) {
    super.close(currentContentInfo);
  }

  save(event: ContentEditorSaveEvent) {
    const convertedContentInfo = this.contentService.convertContentInfoModelToContentInfo(event.contentInfo);
    if (!this.contentID) {
      event.editorSave();
      alert('內容儲存成功');
      this.close(event.contentInfo);
      return;
    }

    this.contentService.updateContent(this.contentID, convertedContentInfo).subscribe(_ => {
      alert('內容儲存成功');
      if (this.onSaved) {
        this.onSaved();
      }
      event.editorSave();
    }, err => {
      alert('內容儲存失敗');
      console.error('內容儲存失敗', err);
    });
  }

}
