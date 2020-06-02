import { Observable } from 'rxjs';
import { ModalService } from '../modal/modal.service';
import { EditorContainerModalComponent } from './editor-container-modal/editor-container-modal.component';
import { Injectable } from '@angular/core';

@Injectable()
export class HtmlEditorService {

  constructor(
    private _modalService: ModalService,
  ) { }

  openEditor(
    config?: { title?: string, content?: string, }
  ): Observable<any> {

    const title = config?.title;
    const content = config?.content;

    const modalSetting = {
      id: `html-editor`,
      width: '100%',
      maxWidth: '100%',
      height: '100%',
    };

    return this._modalService.openComponent({
      component: EditorContainerModalComponent,
      componentInitData: { content, title },
      modalSetting
    });
  }

}