import { Component, OnInit, Input } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from 'projects/cms-lib/src/lib/ui/modal/custom-modal-base';
import { ContentEditorSaveEvent } from 'projects/cms-lib/src/lib/ui/content-editor/content-editor.interface';
import { ContentInfo } from 'projects/cms-lib/src/lib/neuxAPI/bean/ContentInfo';
import { ContentService } from 'projects/cms-lib/src/lib/service/content.service';
import { TemplateGetResponse } from 'projects/cms-lib/src/lib/neuxAPI/bean/TemplateGetResponse';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cms-sitemap-edit-content-modal',
  templateUrl: './sitemap-edit-content-modal.component.html',
  styleUrls: ['./sitemap-edit-content-modal.component.scss']
})
export class SitemapEditContentModalComponent extends CustomModalBase implements OnInit {
  title: string | (() => string);
  actions: CustomModalActionButton[];

  /**
   *
   *
   * @type {string} // SiteMapInfo.layout_id
   * @memberof SitemapEditContentModalComponent
   */
  @Input() contentID: string;

  /**
   *
   *
   * @type {string} // SiteMapInfo.layout_id
   * @memberof SitemapEditContentModalComponent
   */
  @Input() controlID: string;

  contentInfo: ContentInfo;
  selectableTemplates: TemplateGetResponse;

  private _contentSaved = true;

  constructor(
    private _contentService: ContentService
  ) { super(); }

  ngOnInit(): void {
    this.modalRef.addPanelClass('cms-sitemap-edit-content-modal');

    forkJoin([
      this._contentService.getContentByContentID(this.contentID)
        .pipe(tap(contentInfo => this.contentInfo = contentInfo)),
      this._contentService.getTemplateByControlID(this.controlID)
        .pipe(tap(selectableTemplates => this.selectableTemplates = selectableTemplates)),
    ]).subscribe();
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
