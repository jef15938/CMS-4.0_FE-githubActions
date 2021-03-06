import { Injectable } from '@angular/core';
import { ModalService, ModalSetting } from '../modal';
import { EditorMode } from './content-editor.interface';
import { ContentEditorContainerModalComponent, ContentEditorResponse } from './component/content-editor-container-modal/content-editor-container-modal.component';
import { ContentInfo } from '../../../global/api/neuxAPI/bean/ContentInfo';
import { ContentService } from '../../../global/api/service';
import { ContentInfoModel } from '../../../global/api/data-model/models/content-info.model';
import { map } from 'rxjs/operators';

export interface ContentEditorServiceResponse {
  contentInfo: ContentInfo;
  /** 是否存檔過 */
  saved: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ContentEditorService {

  private modalID = 1;

  private getDefaultModalSetting(editorMode): ModalSetting {
    return {
      id: `content-editor-${editorMode}-${this.modalID++}`,
      width: '90%',
      maxWidth: '90%',
      height: '90%',
      maxHeight: '100%',
      closeOnNavigation: false,
      hideCloseBtn: editorMode === EditorMode.EDIT || false,
    } as ModalSetting;
  }

  constructor(
    private modalService: ModalService,
    private contentService: ContentService,
  ) {

  }

  openEditorInfo(content: ContentInfoModel) {
    const editorMode = EditorMode.INFO;
    return this.modalService.openComponent({
      component: ContentEditorContainerModalComponent,
      componentInitData: {
        title: '版型規範',
        content,
        editorMode,
      },
      modalSetting: this.getDefaultModalSetting(editorMode)
    }, false).pipe(map(this.mapContentInfoModelToContentInfo));
  }

  openEditorPreview(content: ContentInfo, controlID: string) {
    const editorMode = EditorMode.READ;
    return this.modalService.openComponent({
      component: ContentEditorContainerModalComponent,
      componentInitData: {
        title: '預覽',
        content: this.contentService.convertContentInfoJsonToContentInfoModel(content),
        editorMode,
      },
      modalSetting: this.getDefaultModalSetting(editorMode)
    }, false).pipe(map(this.mapContentInfoModelToContentInfo));
  }

  openEditorByContent(content: ContentInfo, controlID: string) {
    const editorMode = EditorMode.EDIT;
    return this.modalService.openComponent({
      component: ContentEditorContainerModalComponent,
      componentInitData: {
        content: this.contentService.convertContentInfoJsonToContentInfoModel(content),
        controlID,
        editorMode,
      },
      modalSetting: this.getDefaultModalSetting(editorMode)
    }, true).pipe(map(this.mapContentInfoModelToContentInfo));
  }

  openEditorByIDs(siteID: string, nodeID: string, contentID: string, controlID: string) {
    const editorMode = EditorMode.EDIT;
    return this.modalService.openComponent({
      component: ContentEditorContainerModalComponent,
      componentInitData: {
        siteID,
        nodeID,
        contentID,
        controlID,
        editorMode,
      },
      modalSetting: this.getDefaultModalSetting(editorMode)
    }, true).pipe(map(this.mapContentInfoModelToContentInfo));
  }

  private mapContentInfoModelToContentInfo = (res: ContentEditorResponse) => {
    const response: ContentEditorServiceResponse = {
      contentInfo: this.contentService.convertContentInfoModelToContentInfo(res.contentInfo),
      saved: res.saved,
    };
    return response;
  }

}
