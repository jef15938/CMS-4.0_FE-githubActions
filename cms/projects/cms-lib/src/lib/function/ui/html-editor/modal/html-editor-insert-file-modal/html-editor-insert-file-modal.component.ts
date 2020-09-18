import { Component, OnInit, Input } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from '../../../modal';
import { GallerySharedService } from '../../../gallery-shared/service/gallery-shared.service';
import { FormSharedService } from '../../../form-shared/form-shared.service';

export enum FileSource {
  NONE = 'NONE',
  LOCAL = 'LOCAL',
  FORM = 'FORM',
}

export interface HtmlEditorInsertFileModalConfig {
  href: string;
  text: string;
  galleryID: number;
  galleryName: string;
  fileSource: FileSource;
}

@Component({
  selector: 'cms-html-editor-insert-file-modal',
  templateUrl: './html-editor-insert-file-modal.component.html',
  styleUrls: ['./html-editor-insert-file-modal.component.scss']
})
export class HtmlEditorInsertFileModalComponent extends CustomModalBase implements OnInit {

  FileSource = FileSource;

  title = '插入檔案';
  actions: CustomModalActionButton[];

  @Input() fileLink: HTMLAnchorElement;
  @Input() galleryID: number = null;
  @Input() galleryName: string;
  @Input() fileSource: FileSource = FileSource.NONE;

  aTagConfig: HtmlEditorInsertFileModalConfig;

  fileType = '';
  localUrl = '';

  constructor(
    private gallerySharedService: GallerySharedService,
    private formSharedService: FormSharedService
  ) {
    super();
    this.localUrl = this.getLocalUrl();
  }

  ngOnInit(): void {
    this.aTagConfig = {
      href: this.fileLink?.getAttribute('href') || '',
      text: this.fileLink?.innerText || '',
      galleryID: this.galleryID || null,
      galleryName: this.galleryName || '',
      fileSource: this.fileSource || FileSource.NONE,
    };

    const splitTexts = this.aTagConfig?.text?.split('.');
    this.fileType = splitTexts[splitTexts.length - 1] || '';
  }

  private getLocalUrl() {
    const urlFragments = window.location.href.split('/');
    return `${urlFragments[0]}//${urlFragments[2]}`;
  }

  confirm() {
    this.close(this.aTagConfig);
  }

  selectFileFromForm() {
    this.formSharedService.openForm({}).subscribe(res => {
      if (res) {
        this.aTagConfig.href = res.path;
        this.aTagConfig.galleryName = res.name;
        this.aTagConfig.text = res.name;
        this.aTagConfig.galleryID = res.galleryId;
        this.fileType = res.name.substring(res.name.lastIndexOf('.') + 1);
        this.aTagConfig.fileSource = FileSource.FORM;
      }
    });
  }

  selectFileFromLocal() {
    const galleryID = this.galleryID;
    const galleryName = this.galleryName;

    (
      !galleryID || this.aTagConfig.fileSource === FileSource.FORM
        ? this.gallerySharedService.addGalleryFile()
        : this.gallerySharedService.updateGalleryFile(
          `${galleryID}`,
          galleryName,
          galleryName.substring(galleryName.lastIndexOf('.') + 1),
        )
    ).subscribe(res => {
      if (res) {
        this.aTagConfig.href = res.path;
        this.aTagConfig.galleryName = res.galleryName;
        this.aTagConfig.text = res.galleryName;
        this.aTagConfig.galleryID = res.galleryId;
        this.fileType = res.galleryName.substring(res.galleryName.lastIndexOf('.') + 1);
        this.aTagConfig.fileSource = FileSource.LOCAL;
      }
    });
  }
}
