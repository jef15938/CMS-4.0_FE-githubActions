import { Component, OnInit, Input, EventEmitter, ChangeDetectorRef, AfterViewInit, Inject } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { forkJoin } from 'rxjs';
import { GalleryService, FileUploadModel } from '../../../../../global/api/service';
import { CMS_ENVIROMENT_TOKEN } from '../../../../../global/injection-token/cms-injection-token';
import { CmsEnviroment } from '../../../../../global/interface/cms-enviroment.interface';
import { CustomModalBase, CustomModalActionButton } from '../../../../ui/modal';
import { ColDef } from '../../../../ui/table';
import { CropperService } from '../../../../ui/cropper';

@Component({
  selector: 'cms-upload-gallery-modal',
  templateUrl: './upload-gallery-modal.component.html',
  styleUrls: ['./upload-gallery-modal.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 100 })),
      transition('* => void', [
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class UploadGalleryModalComponent extends CustomModalBase implements OnInit, AfterViewInit {
  title: string | (() => string);
  actions: CustomModalActionButton[];

  readonly fileUploadInputIdentifier = 'fileUpload';

  @Input() categoryName: string;
  @Input() categoryId: string;
  @Input() galleryId: number;
  @Input() galleryType: string;
  @Input() accept: string;

  isCreate = true;
  complete = new EventEmitter<string>();

  files: Array<FileUploadModel> = [];

  colDefs: ColDef[] = [
    {
      colId: 'fileName',
      field: 'fileName',
      title: '檔名',
    },
    {
      colId: 'fileType',
      field: 'fileType',
      title: '類型',
    },
    {
      colId: 'fileSize',
      field: 'fileSize',
      title: '大小',
    },
    // {
    //   colId: 'action',
    //   field: 'action',
    //   title: '操作',
    //   cellRenderer: AuditingActionCellComponent,
    // }
  ];

  constructor(
    private cropperService: CropperService,
    @Inject(CMS_ENVIROMENT_TOKEN) private environment: CmsEnviroment,
    private galleryService: GalleryService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { super(); }

  ngOnInit() {
    this.updateSize('1280px');

    if (this.categoryId && this.categoryName) {
      this.isCreate = true;
      this.title = `上傳檔案：${this.categoryName}`;
      this.accept = '.pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.gif';
    } else if (this.galleryId && this.galleryType) {
      this.isCreate = false;
      this.title = `修改檔案：${this.galleryId}`;
      this.accept = `.${this.galleryType.toLowerCase()}`;
    }
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  addFiles() {
    const fileUpload = document.getElementById(this.fileUploadInputIdentifier) as HTMLInputElement;
    fileUpload.onchange = fileUpload.onchange || (() => {
      const files = Array.from(fileUpload.files);
      if (files.length > 5) {
        alert('一次最多上傳 5 個');
        return;
      }
      this.files = Array.from(fileUpload.files).map(file => this.galleryService.mapFileToFileUploadModel(file));
    });
    fileUpload.click();
  }

  cleanFiles() {
    this.files = [];
  }

  cancelFile(file: FileUploadModel) {
    if (file.canCancel && file.sub) {
      file.sub.unsubscribe();
    }
  }

  cropFile(file: FileUploadModel) {
    if (file) {
      const reader = new FileReader();
      // 轉換成 DataURL
      reader.readAsDataURL(file.data);

      reader.onload = () => {
        // 將圖片 src 替換為 DataURL
        const url = reader.result as string;
        this.cropperService.openEditor(url).subscribe((dataUrl: string) => {
          if (!dataUrl) { return; }
          const blob = this.dataURItoBlob(dataUrl);
          const newFile = this.galleryService.mapFileToFileUploadModel(new File([blob], file.data.name, { type: file.fileType }));
          this.files.splice(this.files.indexOf(file), 1, newFile);
        });
      };
    }
  }

  retryFile(file: FileUploadModel) {
    if (file.canRetry) {
      this.uploadFile(file);
      file.canRetry = false;
    }
  }

  private uploadFile(file: FileUploadModel) {
    return this.galleryService.createGallery(file, this.categoryId);
  }

  create() {
    const fileUpload = document.getElementById(this.fileUploadInputIdentifier) as HTMLInputElement;
    fileUpload.value = '';

    forkJoin(this.files.map(file => this.uploadFile(file))).subscribe(results => {
      if (results.map(r => r.success).every(success => !!success)) {
        this.close(true);
      } else {

      }
    });
  }

  update() {
    const fileUpload = document.getElementById(this.fileUploadInputIdentifier) as HTMLInputElement;
    fileUpload.value = '';

    const file = this.files[0];
    this.uploadFile(file).subscribe(result => {
      if (result.success) {
        this.close(true);
      } else {

      }
    });
  }

  removeFile(file: FileUploadModel) {
    const index = this.files.indexOf(file);
    if (index > -1) {
      this.files.splice(index, 1);
    }
  }

  private dataURItoBlob(dataURI: string): Blob {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString: string;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    } else {
      byteString = unescape(dataURI.split(',')[1]);
    }

    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

}
