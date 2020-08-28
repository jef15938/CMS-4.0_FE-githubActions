import { Component, OnInit, Input, EventEmitter, ChangeDetectorRef, AfterViewInit, Inject, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { forkJoin } from 'rxjs';
import { GalleryService, FileUploadModel } from '../../../../../global/api/service';
import { CMS_ENVIROMENT_TOKEN } from '../../../../../global/injection-token/cms-injection-token';
import { CmsEnviroment } from '../../../../../global/interface/cms-enviroment.interface';
import { CustomModalBase, CustomModalActionButton, ModalService } from '../../../../ui/modal';
import { ColDef } from '../../../../ui/table';
import { CropperService } from '../../../../ui/cropper';
import { GalleryConfigResponseModel } from '../../../../../global/api/data-model/models/gallery-config-response.model';
import { CmsMediaError, CmsErrorHandler } from '../../../../../global/error-handling';

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
  @Input() galleryName: string;
  @Input() galleryType: string;
  @Input() accept: string;
  @Input() galleryConfig: GalleryConfigResponseModel;

  isCreate = true;
  complete = new EventEmitter<string>();

  files: Array<FileUploadModel> = [];

  colDefs: ColDef<FileUploadModel>[] = [
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
    private elementRef: ElementRef,
    private modalService: ModalService,
  ) { super(); }

  ngOnInit() {
    this.updateSize('1280px');

    if (this.categoryId && this.categoryName) {
      this.isCreate = true;
      this.title = `上傳檔案：${this.categoryName}`;
      this.accept = '.pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.gif';
    } else if (this.galleryId && this.galleryType) {
      this.isCreate = false;
      this.title = `修改檔案：${this.galleryName}`;
      this.accept = `.${this.galleryType.toLowerCase()}`;
    }
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  private getFileUpload() {
    return (this.elementRef.nativeElement as HTMLElement).querySelector(`#${this.fileUploadInputIdentifier}`) as HTMLInputElement;
  }

  addFiles(galleryConfig: GalleryConfigResponseModel) {
    try {
      if (!galleryConfig) {
        alert('無法取得上傳設定檔，請重整頁面後再試');
        return;
      }

      const maxUploadNumber = this.isCreate ? galleryConfig.maxUploadNumber : 1;
      if (this.files.length > maxUploadNumber) {
        alert(`一次最多上傳 ${maxUploadNumber} 個檔案，現在上傳清單中有 ${this.files.length} 個`);
        return;
      }

      const fileUpload = this.getFileUpload();
      fileUpload.onchange = fileUpload.onchange || (() => {
        const files = Array.from(fileUpload.files);
        fileUpload.value = '';

        if (!files.length) {
          return;
        }

        const checkResults: {
          fileName: string;
          error: string;
        }[] = files.map(file => {
          const checkResult = {
            fileName: file.name,
            error: '',
          };

          if (galleryConfig.limitCharacter) {
            const limitCharacters = galleryConfig.limitCharacter.split(',');
            if (limitCharacters.some(c => file.name.indexOf(c) > -1)) {
              checkResult.error = `檔名不可含有下列字元 : ${galleryConfig.limitCharacter}`;
              return checkResult;
            }
          }

          const ext = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length);

          const fileLimit = this.findFileSizeLimitByExt(ext);
          if (!fileLimit) {
            checkResult.error = `不支援 .${ext}`;
            return checkResult;
          }

          if (file.size >= fileLimit.maxFileSize * 1024) {
            checkResult.error = `上傳大小過大，${ext} 上傳上限為 ${fileLimit.maxFileSize} kb`;
            return checkResult;
          }

          return checkResult;
        });

        const invalidResults = checkResults.filter(r => r.error);
        if (invalidResults.length) {
          const title = '上傳的檔案不符限制';
          const messages = invalidResults.map(r => {
            return `<p><span class="text-error">${r.fileName}</span><br><span>${r.error}</span></p>`;
          });
          const message = `<p>以下檔案不符檔案限制，本次選擇的所有檔案不加入上傳清單</p>${messages.join('')}`;
          this.modalService.openMessage({ title, message }).subscribe();
          return;
        }

        files.forEach(f => {
          this.files.push(this.galleryService.mapFileToFileUploadModel(f));
        });
      });
      fileUpload.click();
    } catch (error) {
      CmsErrorHandler.throwError(error, new CmsMediaError().setMessage('UploadGalleryModalComponent.addFiles()'));
    }
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

  upload(action: 'create' | 'update') {
    const maxUploadNumber = this.isCreate ? this.galleryConfig.maxUploadNumber : 1;
    if (this.files.length > maxUploadNumber) {
      alert(`一次最多上傳 ${maxUploadNumber} 個檔案，現在上傳清單中有 ${this.files.length} 個`);
      return;
    }

    const currentTotalBytes = this.countTotalFileSize(this.files);
    if (currentTotalBytes > this.galleryConfig.maxUploadSize * 1024) {
      alert(`檔案總大小超過可上傳的大小限制(${this.galleryConfig.maxUploadSize} kb)。`);
      return;
    }

    return action === 'create' ? this.create() : this.update();
  }

  create() {
    forkJoin(this.files.map(file => this.galleryService.createGallery(file, this.categoryId)))
      .subscribe(results => {
        const failedUploads = results.filter(r => !r.success);
        if (!failedUploads.length) {
          this.close(true);
        } else {
          alert(`以下檔案上傳失敗 : ${failedUploads.map(failed => failed.fileName).join(', ')}`);
        }
      });
  }

  update() {
    const file = this.files[0];
    this.galleryService.updateGallery(file, this.galleryId)
      .subscribe(result => {
        if (result.success) {
          this.close(true);
        } else {
          alert('檔案上傳失敗');
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

  countTotalFileSize(files: FileUploadModel[]) {
    return files.reduce((a, b) => a + b.fileSize, 0);
  }

  findFileSizeLimitByExt(ext: string) {
    if (!this.galleryConfig) {
      return null;
    }
    const fileLimit = this.galleryConfig.fileLimits.find(limit => limit.fileNameExt.toLowerCase() === ext);
    return fileLimit;
  }

  openInfo() {
    if (!this.galleryConfig) { alert('無法取得資訊'); return; }
    const title = '上傳說明';
    const messages: string[] = [];
    messages.push(`單次上傳檔案數限制 : ${this.galleryConfig.maxUploadNumber} 個`);
    messages.push(`單次上傳檔案總大小限制 : ${this.galleryConfig.maxUploadSize} kb`);
    messages.push(`檔名字元不可包含 : ${this.galleryConfig.limitCharacter}`);
    this.galleryConfig.fileLimits.forEach(fileLimit => {
      messages.push(`[${fileLimit.fileNameExt}] 類型單檔大小限制 : ${fileLimit.maxFileSize} kb`);
    });
    const message = messages.map(msg => `<p>${msg}</p>`).join('');
    this.modalService.openMessage({ title, message }).subscribe();
  }

}
