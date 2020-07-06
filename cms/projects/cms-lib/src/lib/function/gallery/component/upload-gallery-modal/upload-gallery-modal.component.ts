import { Component, OnInit, Input, EventEmitter, ChangeDetectorRef, AfterViewInit, Inject } from '@angular/core';
import { HttpRequest, HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Subscription, of, Observable } from 'rxjs';
import { map, tap, last, catchError } from 'rxjs/operators';
import { GalleryService } from '../../../../global/api/service';
import { CustomModalBase, CustomModalActionButton } from '../../../ui/modal';
import { ColDef } from '../../../ui/table';
import { CropperService } from '../../../ui/cropper';
import { CMS_ENVIROMENT } from '../../../../global/injection-token/cms-injection-token';
import { CmsEnviroment } from '../../../../global/interface/cms-enviroment.interface';

export class FileUploadModel {
  fileName: string;
  fileSize: number;
  fileType: string;
  data: File;
  state: string;
  inProgress: boolean;
  progress: number;
  canRetry: boolean;
  canCancel: boolean;
  sub?: Subscription;
}

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

  @Input() categoryName: string;
  @Input() categoryId: string;
  @Input() galleryId: number;

  param = 'file';
  target = 'https://file.io';
  accept = 'image/*';
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
    private http: HttpClient,
    private cropperService: CropperService,
    @Inject(CMS_ENVIROMENT) private environment: CmsEnviroment,
    private galleryService: GalleryService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { super(); }

  ngOnInit() {
    this.updateSize('1280px');

    if (this.categoryId && this.categoryName) {
      this.title = `上傳檔案：${this.categoryName}`;
    } else if (this.galleryId) {
      this.title = `修改檔案：${this.galleryId}`;
    }
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  private mapFileToFileUploadModel(file: File): FileUploadModel {
    return {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      data: file,
      state: '',
      inProgress: false,
      progress: 0,
      canRetry: false,
      canCancel: true
    };
  }

  addFiles() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.onchange = fileUpload.onchange || (() => {
      this.files = this.files.concat(
        Array.from(fileUpload.files).map(file => this.mapFileToFileUploadModel(file))
      );
    });
    fileUpload.click();
  }

  cleanFiles() {
    this.files = [];
  }

  cancelFile(file: FileUploadModel) {
    if (file.sub) {
      file.sub.unsubscribe();
    }
    // this.removeFileFromArray(file);
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
          const newFile = this.mapFileToFileUploadModel(new File([blob], file.data.name, { type: file.fileType }));
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
    const formData = new FormData();
    formData.append(this.param, file.data);
    // formData.append('description', file.data.name);

    const req = new HttpRequest('POST', `${this.environment.apiBaseUrl}/Gallery/${this.categoryId}`, formData, {
      reportProgress: true
    });

    file.inProgress = true;
    file.sub = this.http.request(req).pipe(
      map(event => {
        console.warn('uploadFile() event = ', event);
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            return null;
          case HttpEventType.Response:
            return event;
        }
        return null;
      }),
      last(),
      catchError((error: HttpErrorResponse) => {
        console.warn('uploadFail', error);
        file.inProgress = false;
        file.canRetry = true;
        return of(`${file.data.name} upload failed.`);
      })
    ).subscribe(_ => {
      file.inProgress = false;
      file.canRetry = false;
      file.canCancel = false;
    });

    // file.sub = this.http.request(req).pipe(
    //   map(event => {
    //     console.warn('uploadFile() event = ', event);
    //     switch (event.type) {
    //       case HttpEventType.UploadProgress:
    //         file.progress = Math.round(event.loaded * 100 / event.total);
    //         return null;
    //       case HttpEventType.Response:
    //         return event;
    //     }
    //     return null;
    //   }),
    //   tap(message => { }),
    //   last(),
    //   catchError((error: HttpErrorResponse) => {
    //     file.inProgress = false;
    //     file.canRetry = true;
    //     return of(`${file.data.name} upload failed.`);
    //   })
    // ).subscribe(
    //   (event: any) => {
    //     if (typeof (event) === 'object') {
    //       // this.removeFileFromArray(file);
    //       // this.complete.emit(event.body);
    //     }
    //   }
    // );
  }

  uploadFiles() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.value = '';

    // forkJoin(this.files.map(file => this.uploadFile(file))).subscribe(() => {
    //   alert('Complete');
    // });

    // this.files.forEach(file => {
    //   this.uploadFile(file);
    // });
  }

  private removeFileFromArray(file: FileUploadModel) {
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

  upload() {
    if (!this.files.length) {
      alert('沒有檔案');
      return;
    }
    const file = this.files[0];
    let action: Observable<any>;
    if (this.categoryId && this.categoryName) { // 新增
      action = this.galleryService.createGallery(file.data, this.categoryId);
    } else if (this.galleryId) { // 修改
      action = this.galleryService.updateGallery(file.data, this.galleryId);
    }
    if (action) {
      action.subscribe((result: { success: boolean }) => {
        if (!result.success) {
          alert('操作失敗');
        }
        this.close(true);
      });
    }
  }

}
