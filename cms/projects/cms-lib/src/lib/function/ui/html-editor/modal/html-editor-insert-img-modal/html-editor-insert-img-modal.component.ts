import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from '../../../modal';
import { GallerySharedService } from '../../../gallery-shared/service/gallery-shared.service';
import { GalleryService } from '../../../../../global/api/service';
import { GalleryInfo } from '../../../../../global/api/neuxAPI/bean/GalleryInfo';

@Component({
  selector: 'cms-html-editor-insert-img-modal',
  templateUrl: './html-editor-insert-img-modal.component.html',
  styleUrls: ['./html-editor-insert-img-modal.component.scss']
})
export class HtmlEditorInsertImgModalComponent extends CustomModalBase implements OnInit {

  @ViewChild('Img') img: ElementRef<HTMLImageElement>;

  title = '圖片設定';
  actions: CustomModalActionButton[];

  @Input() src = '';
  @Input() alt = '';
  @Input() width: number = null;
  @Input() height: number = null;

  constructor(
    private galleryService: GalleryService,
    private gallerySharedService: GallerySharedService,
  ) { super(); }

  ngOnInit(): void {
    this.src = this.src || '';
    this.alt = this.alt || '';
    this.width = this.width || null;
    this.height = this.height || null;
  }

  checkWidthHeight() {
    setTimeout(() => {
      const img = this.img.nativeElement;
      this.width = img.width;
      this.height = img.height;
    }, 250);
  }

  changeImage() {
    this.gallerySharedService.openGallery().subscribe((selectedGallery: GalleryInfo) => {
      if (selectedGallery) {
        this.src = `${this.galleryService.getGalleryShowUrlByGalleryID(selectedGallery.gallery_id)}`;
      }
    });
  }

  confirm() {
    this.close({
      src: this.src || '',
      alt: this.alt || '',
      width: this.width || 200,
      height: this.height || 200,
    });
  }

}
