import { Component, OnInit } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from 'projects/cms-lib/src/lib/ui/modal/custom-modal-base';
import { ContentEditorSaveEvent } from 'projects/cms-lib/src/lib/ui/content-editor/content-editor.interface';

@Component({
  selector: 'cms-sitemap-edit-content-modal',
  templateUrl: './sitemap-edit-content-modal.component.html',
  styleUrls: ['./sitemap-edit-content-modal.component.scss']
})
export class SitemapEditContentModalComponent extends CustomModalBase implements OnInit {
  title: string | (() => string);
  actions: CustomModalActionButton[];

  private _contentSaved = true;

  constructor() { super(); }

  ngOnInit(): void {
    this.modalRef.addPanelClass('cms-sitemap-edit-content-modal')
  }

  close() {
    // alert('Modal close()');
    super.close();
  }

  save(event: ContentEditorSaveEvent) {
    event.editorSave();
    alert('saved');
  }

}
