import { Component, OnInit, Input } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from '../../../modal';
import { GallerySharedService } from '../../../gallery-shared/service/gallery-shared.service';
import { GalleryInfo } from '../../../../../global/api/neuxAPI/bean/GalleryInfo';

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

  aTagConfig: {
    href: string;
    text: string;
    galleyID: number;
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
      galleyID: this.galleryID || null,
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

  changeGallery() {
    this.gallerySharedService.openGallery(['pdf', 'doc', 'docx', 'xls', 'xlsx']).subscribe((selectedGallery: GalleryInfo) => {
      if (selectedGallery) {
        this.aTagConfig.href = selectedGallery.url;
        this.aTagConfig.text = selectedGallery.file_name;
        this.aTagConfig.galleyID = selectedGallery.gallery_id;
        this.fileType = selectedGallery.file_type;
      }
    });
  }
}
