import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { CustomModalBase, CustomModalActionButton } from 'projects/cms-lib/src/lib/ui/modal/custom-modal-base';
import { Subscription, of } from 'rxjs';
import { HttpRequest, HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { map, tap, last, catchError } from 'rxjs/operators';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ColDef } from 'projects/cms-lib/src/lib/ui/table/table.interface';

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
export class UploadGalleryModalComponent extends CustomModalBase implements OnInit {
  title: string | (() => string) = () => `上傳檔案：${this.category_name}`;
  actions: CustomModalActionButton[];

  @Input() category_name: string;
  @Input() categoryId: string;

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
    private _http: HttpClient
  ) { super(); }

  ngOnInit() {
    this.updateSize('1280px');
  }

  addFiles() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.onchange = fileUpload.onchange || (() => {
      this.files = this.files.concat(
        Array.from(fileUpload.files).map(file => {
          return {
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            data: file,
            state: 'in',
            inProgress: false,
            progress: 0,
            canRetry: false,
            canCancel: true
          }
        })
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
    this.removeFileFromArray(file);
  }

  retryFile(file: FileUploadModel) {
    if (file.canRetry) {
      this.uploadFile(file);
      file.canRetry = false;
    }
  }

  private uploadFile(file: FileUploadModel) {
    const fd = new FormData();
    fd.append(this.param, file.data);

    const req = new HttpRequest('POST', this.target, fd, {
      reportProgress: true
    });

    file.inProgress = true;
    file.sub = this._http.request(req).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      tap(message => { }),
      last(),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        file.canRetry = true;
        return of(`${file.data.name} upload failed.`);
      })
    ).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {
          this.removeFileFromArray(file);
          this.complete.emit(event.body);
        }
      }
    );
  }

  private uploadFiles() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.value = '';

    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }

  private removeFileFromArray(file: FileUploadModel) {
    const index = this.files.indexOf(file);
    if (index > -1) {
      this.files.splice(index, 1);
    }
  }

}
