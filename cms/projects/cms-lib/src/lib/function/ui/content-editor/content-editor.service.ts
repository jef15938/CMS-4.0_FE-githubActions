import { Injectable } from '@angular/core';
import { Observable, NEVER } from 'rxjs';
import { ModalService, ModalSetting } from '../modal';
import { ContentEditorServiceInterface, ContentEditorServiceConfig, EditorMode } from './content-editor.interface';
import { ContentEditorContainerModalComponent } from './component/content-editor-container-modal/content-editor-container-modal.component';


@Injectable({
  providedIn: 'root'
})
export class ContentEditorService implements ContentEditorServiceInterface {

  constructor(
    private modalService: ModalService,
  ) {

  }

  openEditor(config: ContentEditorServiceConfig): Observable<any> {
    if (!config?.contentID && !config.content) { alert('資料異常：無 ContentID'); return NEVER; }
    let fullScreen = true;
    const modalSetting: ModalSetting = {
      id: `content-editor-${config.editorMode}`,
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      closeOnNavigation: false,
    };

    if (config.editorMode === EditorMode.INFO) {
      modalSetting.width = '90%';
      modalSetting.maxWidth = '90%';
      modalSetting.height = '90%';
      fullScreen = false;
    }

    return this.modalService.openComponent({
      component: ContentEditorContainerModalComponent,
      componentInitData: {
        title: config.title || '',
        controlID: config.controlID,
        contentID: config.contentID,
        content: config.content,
        editorMode: config.editorMode,
        onSaved: config.onSaved
      },
      modalSetting
    }, fullScreen);
  }

}
