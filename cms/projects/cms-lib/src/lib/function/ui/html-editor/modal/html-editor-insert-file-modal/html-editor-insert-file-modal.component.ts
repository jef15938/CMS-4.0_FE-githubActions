import { Component, OnInit, Input } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from '../../../modal';
import { GallerySharedService } from '../../../gallery-shared/service/gallery-shared.service';

@Component({
  selector: 'cms-html-editor-insert-file-modal',
  templateUrl: './html-editor-insert-file-modal.component.html',
  styleUrls: ['./html-editor-insert-file-modal.component.scss']
})
export class HtmlEditorInsertFileModalComponent extends CustomModalBase implements OnInit {

  title = '插入檔案';
  actions: CustomModalActionButton[];

  @Input() fileLink: HTMLAnchorElement;
  @Input() galleryID: number = null;
  @Input() galleryName: string;

  aTagConfig: {
    href: string;
    text: string;
    galleryID: number;
    galleryName: string;
  };

  fileType = '';
  localUrl = '';

  constructor(
    private gallerySharedService: GallerySharedService,
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

  selectFile() {
    const galleryID = this.galleryID;
    const galleryName = this.galleryName;
    (
      galleryID
        ? this.gallerySharedService.updateGalleryFile(
          `${galleryID}`,
          galleryName,
          galleryName.substring(galleryName.lastIndexOf('.') + 1),
        )
        : this.gallerySharedService.addGalleryFile()
    ).subscribe(res => {
      if (res) {
        this.aTagConfig.href = res.path;
        this.aTagConfig.galleryName = res.galleryName;
        this.aTagConfig.text = res.galleryName;
        this.aTagConfig.galleryID = res.galleryId;
        this.fileType = res.galleryName.substring(res.galleryName.lastIndexOf('.') + 1);
      }
    });
  }
}
