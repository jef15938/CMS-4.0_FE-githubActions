import { Component, OnInit, Input, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { GalleryService, FileUploadModel } from '../../../../../global/api/service';
import { CustomModalBase, CustomModalActionButton, ModalService } from '../../../../ui/modal';
import { CropperService } from '../../../../ui/cropper';
import { GalleryConfigResponseModel } from '../../../../../global/api/data-model/models/gallery-config-response.model';
import { CmsErrorHandler } from '../../../../../global/error-handling';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { map } from 'rxjs/operators';

export enum GalleryType {
  FILE = 'FILE',
  IMAGE = 'IMAGE',
}

export enum StepState {
  CHOOSE_FILE = 'CHOOSE_FILE',
  CROP_FILE = 'CROP_FILE',
  UPLOAD = 'UPLOAD',
}

@Component({
  selector: 'cms-add-gallery-modal',
  templateUrl: './add-gallery-modal.component.html',
  styleUrls: ['./add-gallery-modal.component.scss'],
})
export class AddGalleryModalComponent extends CustomModalBase implements OnInit {
  title: string | (() => string) = '';
  actions: CustomModalActionButton[];

  GalleryType = GalleryType;
  StepState = StepState;

  @ViewChild('stepper') stepper: MatHorizontalStepper;

  readonly fileUploadInputIdentifier = 'fileUpload';

  @Input() galleryType: GalleryType;
  @Input() imageHeightWidth: {
    width: number;
    height: number;
  } = {
      width: 800,
      height: 600,
    };

  accept = '';
  galleryConfig: GalleryConfigResponseModel;

  typeText = '';

  originFile: FileUploadModel;
  croppedFile: FileUploadModel; // only when type==='file'

  formGroupChooseFile: FormGroup;
  formGroupCropFile: FormGroup;

  currentStepState = StepState.CHOOSE_FILE;

  constructor(
    private formBuilder: FormBuilder,
    private cropperService: CropperService,
    private galleryService: GalleryService,
    private changeDetectorRef: ChangeDetectorRef,
    private elementRef: ElementRef,
    private modalService: ModalService,
  ) { super(); }

  ngOnInit() {
    // this.updateSize('1280px');
    this.typeText = this.getTypeTextByGalleryType(this.galleryType);
    this.title = `加入本地${this.typeText}`;
    this.accept = this.getAcceptByGalleryType(this.galleryType);
    this.formGroupChooseFile = this.formBuilder.group({
      value: [null, Validators.required],
    });
    this.formGroupCropFile = this.formBuilder.group({
      value: [null, Validators.required],
      setting: [null],
    });
  }

  private getTypeTextByGalleryType(galleryType: GalleryType) {
    let type = '';
    if (galleryType === GalleryType.FILE) {
      type = '檔案';
    }
    if (galleryType === GalleryType.IMAGE) {
      type = '圖片';
    }
    return type;
  }

  private getAcceptByGalleryType(galleryType: GalleryType) {
    if (galleryType === GalleryType.FILE) {
      return '.pdf,.doc,.docx,.xls,.xlsx';
    }
    if (galleryType === GalleryType.IMAGE) {
      return '.png,.jpg,.jpeg,.gif';
    }
    return '';
  }

  private getFileUpload() {
    return (this.elementRef.nativeElement as HTMLElement).querySelector(`#${this.fileUploadInputIdentifier}`) as HTMLInputElement;
  }

  addFile() {
    try {
      const fileUpload = this.getFileUpload();
      fileUpload.onchange = fileUpload.onchange || (() => {
        const files = Array.from(fileUpload.files);
        fileUpload.value = '';

        if (!files.length) {
          return;
        }

        const file = this.galleryService.mapFileToFileUploadModel(files[0]);
        this.formGroupChooseFile.get('value').patchValue(file);
        this.stepper.next();
      });

      fileUpload.click();
    } catch (error) {
      CmsErrorHandler.throwAndShow(error, 'AddGalleryModalComponent.addFile()', '加入檔案錯誤');
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

  cropFile(file: FileUploadModel) {
    if (file) {
      this.cropperService.openEditor(file.url).subscribe((dataUrl: string) => {
        if (!dataUrl) { return; }
        const blob = this.dataURItoBlob(dataUrl);
        const newFile = this.galleryService.mapFileToFileUploadModel(new File([blob], file.data.name, { type: file.fileType }));
        this.formGroupCropFile.get('value').patchValue(newFile);
        this.stepper.next();
      });
    }
  }

  onStepSelectionChange(ev: StepperSelectionEvent) {
    console.warn('ev = ', ev);
    this.currentStepState = ev.selectedStep.state as StepState;
    if (this.currentStepState === StepState.CHOOSE_FILE) {
      this.formGroupCropFile.get('value').patchValue(null);
      this.formGroupCropFile.get('setting').patchValue(null);
    }
  }

  addToServer(galleryType: GalleryType) {
    (galleryType === GalleryType.FILE
      ? this.addFileToServer()
      : this.addImageToServer()
    ).subscribe(res => this.close(res));
  }

  private addFileToServer() {
    const gallery = this.formGroupChooseFile.get('value').value;
    return this.galleryService.addFile(gallery).pipe(
      map(({ galleryId, path }) => {
        return { galleryId, path };
      })
    );
  }

  private addImageToServer() {
    const origin = this.formGroupChooseFile.get('value').value;
    const cropped = this.formGroupCropFile.get('value').value;
    const setting = this.formGroupCropFile.get('setting').value;
    return this.galleryService.addGallery(origin, cropped, setting).pipe(
      map(({ galleryId, path }) => {
        return { galleryId, path };
      })
    );
  }

}
