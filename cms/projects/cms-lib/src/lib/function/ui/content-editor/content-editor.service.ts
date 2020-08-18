import { Injectable } from '@angular/core';
import { ModalService, ModalSetting } from '../modal';
import { EditorMode } from './content-editor.interface';
import { ContentEditorContainerModalComponent } from './component/content-editor-container-modal/content-editor-container-modal.component';
import { ContentInfo } from '../../../global/api/neuxAPI/bean/ContentInfo';


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
  ) {

  }

  openEditorInfo(content: ContentInfo) {
    const editorMode = EditorMode.READ;
    return this.modalService.openComponent({
      component: ContentEditorContainerModalComponent,
      componentInitData: {
        title: '版型規範',
        content,
        editorMode,
      },
      modalSetting: this.getDefaultModalSetting(editorMode)
    }, false);
  }

  openEditorPreview(content: ContentInfo, controlID: string) {
    const editorMode = EditorMode.INFO;
    return this.modalService.openComponent({
      component: ContentEditorContainerModalComponent,
      componentInitData: {
        title: '預覽',
        content,
        editorMode,
      },
      modalSetting: this.getDefaultModalSetting(editorMode)
    }, false);
  }

  openEditorByContent(content: ContentInfo, controlID: string) {
    const editorMode = EditorMode.EDIT;
    return this.modalService.openComponent({
      component: ContentEditorContainerModalComponent,
      componentInitData: {
        content,
        controlID,
        editorMode,
      },
      modalSetting: this.getDefaultModalSetting(editorMode)
    }, true);
  }

  openEditorByContentID(contentID: string, controlID: string) {
    const editorMode = EditorMode.EDIT;
    return this.modalService.openComponent({
      component: ContentEditorContainerModalComponent,
      componentInitData: {
        contentID,
        controlID,
        editorMode,
      },
      modalSetting: this.getDefaultModalSetting(editorMode)
    }, true);
  }

}
