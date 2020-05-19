import { IContentEditorService, IContentEditorServiceConfig, EditorMode } from './content-editor.interface';
import { Observable } from 'rxjs';
import { ModalService } from '../modal/modal.service';
import { EditorContainerModalComponent } from './component/editor-container-modal/editor-container-modal.component';
import { Injectable } from '@angular/core';

@Injectable()
export class ContentEditorService implements IContentEditorService {

  constructor(
    private _modalService: ModalService,
  ) {

  }

  openEditor(config: IContentEditorServiceConfig): Observable<any> {
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

    return this._modalService.openComponent({
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