import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from './../../ui/modal';
import { ContentEditorServiceInterface, ContentEditorServiceConfig, EditorMode } from './content-editor.interface';
import { EditorContainerModalComponent } from './component/editor-container-modal/editor-container-modal.component';


@Injectable({
  providedIn: 'root'
})
export class ContentEditorService implements ContentEditorServiceInterface {

  constructor(
    private modalService: ModalService,
  ) {

  }

  openEditor(config: ContentEditorServiceConfig): Observable<any> {
    const modalSetting = {
      id: `content-editor-${config.mode}`,
      width: '100%',
      maxWidth: '100%',
      height: '100%',
    };

    if (config.mode === EditorMode.INFO) {
      modalSetting.width = '90%';
      modalSetting.maxWidth = '90%';
      modalSetting.height = '90%';
    }

    return this.modalService.openComponent({
      component: EditorContainerModalComponent,
      componentInitData: {
        contentInfo: config.contentInfo,
        mode: config.mode,
        selectableTemplates: config.selectableTemplates,
      },
      modalSetting
    });
  }

}
