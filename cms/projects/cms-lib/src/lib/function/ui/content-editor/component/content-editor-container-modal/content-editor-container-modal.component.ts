import { Component, OnInit, Input } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CustomModalBase, CustomModalActionButton, ModalService } from '../../../modal';
import { ContentEditorSaveEvent, EditorMode } from '../../content-editor.interface';
import { ContentService } from '../../../../../global/api/service';
import { TemplateGetResponseModel } from '../../../../../global/api/data-model/models/template-get-response.model';
import { ContentInfoModel } from '../../../../../global/api/data-model/models/content-info.model';
import { CmsErrorHandler } from '../../../../../global/error-handling/cms-error-handler';
import { CmsLoadingToggle } from '../../../../../global/service/cms-loading-toggle.service';

export interface ContentEditorResponse {
  contentInfo: ContentInfoModel;
  /** 是否存檔過 */
  saved: boolean;
}

@Component({
  selector: 'cms-content-editor-container-modal',
  templateUrl: './content-editor-container-modal.component.html',
  styleUrls: ['./content-editor-container-modal.component.scss']
})
export class ContentEditorContainerModalComponent extends CustomModalBase<ContentEditorContainerModalComponent, ContentEditorResponse>
  implements OnInit {
  title = '';
  actions: CustomModalActionButton[];

  @Input() siteID?: string;
  @Input() nodeID?: string;
  @Input() contentID?: string;
  @Input() controlID?: string;
  @Input() content?: ContentInfoModel;
  @Input() editorMode: EditorMode = EditorMode.EDIT;
  @Input() onSaved: () => void;

  templates: TemplateGetResponseModel;

  private saved = false;

  constructor(
    private contentService: ContentService,
    private modalService: ModalService,
    private cmsLoadingToggle: CmsLoadingToggle,
  ) { super(); }

  ngOnInit(): void {
    this.modalRef.addPanelClass([`cms-content-editor-container-modal`, `mode-${this.editorMode}`]);
    if (this.siteID && this.nodeID) {
      this.contentService.getSitemapContentBySiteIdAndNodeId(this.siteID, this.nodeID)
        .pipe(CmsErrorHandler.rxHandleError((error, showMessage) => {
          showMessage();
          this.close(null);
        }))
        .subscribe(content => this.content = content);
    }

    if (this.editorMode === EditorMode.EDIT) {
      this.contentService.getTemplateByControlID(this.controlID)
        .pipe(CmsErrorHandler.rxHandleError((error, showMessage) => {
          showMessage();
          this.closeModal(null);
        }))
        .subscribe(templates => this.templates = templates);
    }

  }

  closeModal(currentContentInfo: ContentInfoModel) {
    const res: ContentEditorResponse = { contentInfo: currentContentInfo, saved: this.saved };
    super.close(res);
    if (this.siteID && this.nodeID) {
      this.contentService.getSitemapContentUnlockBySiteIdAndNodeId(this.siteID, this.nodeID)
        .pipe(CmsErrorHandler.rxHandleError())
        .subscribe();
    }
  }

  save(event: ContentEditorSaveEvent, closeAfterSave = false) {
    const convertedContentInfo = this.contentService.convertContentInfoModelToContentInfo(event.contentInfo);
    if (!this.siteID || !this.nodeID || !this.contentID) {
      event.editorSave();
      this.modalService.openMessage({ message: '內容儲存成功' }).subscribe();
      this.closeModal(event.contentInfo);
      return;
    }


    const action = event.save
      ? this.contentService
        .updateContent(this.contentID, convertedContentInfo)
        .pipe(
          tap(_ => {
            this.saved = true;
            this.cmsLoadingToggle.close();
            this.modalService.openMessage({ message: '內容儲存成功' }).subscribe();
          }),
          CmsErrorHandler.rxHandleError((error, showMessage) => {
            this.cmsLoadingToggle.close();
            showMessage();
          })
        )
      : of(undefined);

    if (event.save) {
      this.cmsLoadingToggle.open();
    }

    action.subscribe(_ => {
      if (this.onSaved) {
        this.onSaved();
      }
      event.editorSave();
      if (closeAfterSave) {
        this.closeModal(event.contentInfo);
      }
    }, err => {
      this.modalService.openMessage({ message: '內容儲存失敗' }).subscribe();
      console.error('內容儲存失敗', err);
    });
  }

}
