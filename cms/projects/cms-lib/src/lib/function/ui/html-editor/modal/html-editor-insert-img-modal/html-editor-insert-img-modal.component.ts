import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from '../../../modal';
import { GallerySharedService } from '../../../gallery-shared/service/gallery-shared.service';
import { GalleryService } from '../../../../../global/api/service';
import { GalleryInfo } from '../../../../../global/api/neuxAPI/bean/GalleryInfo';
import { Subject, fromEvent } from 'rxjs';
import { switchMap, tap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'cms-html-editor-insert-img-modal',
  templateUrl: './html-editor-insert-img-modal.component.html',
  styleUrls: ['./html-editor-insert-img-modal.component.scss']
})
export class HtmlEditorInsertImgModalComponent extends CustomModalBase implements OnInit, OnDestroy {

  @ViewChild('Img') img: ElementRef<HTMLImageElement>;

  title = '圖片設定';
  actions: CustomModalActionButton[];

  @Input() src = '';
  @Input() alt = '';
  @Input() width: number = null;
  @Input() height: number = null;
  @Input() galleryID: number = null;

  private srcChange$ = new Subject();
  private destroy$ = new Subject();

  constructor(
    private galleryService: GalleryService,
    private gallerySharedService: GallerySharedService,
  ) { super(); }

  ngOnInit(): void {
    this.src = this.src || '';
    this.alt = this.alt || '';
    this.width = this.width || null;
    this.height = this.height || null;
    this.galleryID = this.height || null;

    this.srcChange$.pipe(
      takeUntil(this.destroy$),
      switchMap(_ => fromEvent(this.img.nativeElement, 'load').pipe(tap(__ => this.checkWidthHeight()))),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

  checkImgSize() {
    this.srcChange$.next();
  }

  private checkWidthHeight() {
    const img = this.img.nativeElement;
    this.width = img.width;
    this.height = img.height;
  }

  changeGallery() {
    this.gallerySharedService.openGallery().subscribe((selectedGallery: GalleryInfo) => {
      if (selectedGallery) {
        this.galleryID = selectedGallery.gallery_id;
        this.src = selectedGallery.url;
        this.checkImgSize();
      }
    });
  }

  confirm() {
    this.close({
      src: this.src || '',
      alt: this.alt || '',
      width: this.width || 200,
      height: this.height || 200,
      galleryID: this.galleryID || 200,
    });
  }

}
