import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from '@cms-lib/ui/modal';
import { EditorContainerModalComponent } from './editor-container-modal/editor-container-modal.component';

@Injectable({
  providedIn: 'root'
})
export class HtmlEditorService {

  constructor(
    private modalService: ModalService,
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

    return this.modalService.openComponent({
      component: EditorContainerModalComponent,
      componentInitData: { content, title },
      modalSetting
    });
  }

}
