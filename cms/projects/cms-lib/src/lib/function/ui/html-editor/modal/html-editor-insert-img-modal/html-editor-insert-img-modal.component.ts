import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy, Inject } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { switchMap, tap, takeUntil } from 'rxjs/operators';
import { CustomModalBase, CustomModalActionButton } from '../../../modal';
import { GallerySharedService } from '../../../gallery-shared/service/gallery-shared.service';
import { CMS_ENVIROMENT_TOKEN } from '../../../../../global/injection-token/cms-injection-token';
import { CmsEnviroment } from '../../../../../global/interface';

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
  @Input() galleryName = '';

  timestamp = new Date().getTime();

  private srcChange$ = new Subject();
  private destroy$ = new Subject();

  constructor(
    private gallerySharedService: GallerySharedService,
    @Inject(CMS_ENVIROMENT_TOKEN) public environment: CmsEnviroment,
  ) { super(); }

  ngOnInit(): void {
    this.src = this.src || '';
    this.alt = this.alt || '';
    this.width = this.width || null;
    this.height = this.height || null;
    this.galleryID = this.galleryID || null;
    this.galleryName = this.galleryName || '';

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

  selectImage() {
    const galleryID = this.galleryID;
    const galleryName = this.galleryName;
    (
      galleryID
        ? this.gallerySharedService.updateGalleryImage(
          `${galleryID}`,
          galleryName,
          galleryName.substring(galleryName.lastIndexOf('.') + 1),
          null,
        )
        : this.gallerySharedService.addGalleryImage()
    ).subscribe(res => {
      if (res) {
        this.timestamp = new Date().getTime();
        const saved = res as any;
        this.galleryID = saved.galleryId;
        this.galleryName = saved.galleryName;
        this.src = `${this.environment.apiBaseUrl}${saved.path}`;
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
      galleryName: this.galleryName,
    });
  }

}
