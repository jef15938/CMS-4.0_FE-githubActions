import { Component, OnInit, Input, ElementRef, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GalleryService, FileUploadModel } from '../../../../../global/api/service';
import { CustomModalBase, ModalService } from '../../../../ui/modal';
import { CropperService, CropSetting } from '../../../../ui/cropper';
import { GalleryConfigResponseModel } from '../../../../../global/api/data-model/models/gallery-config-response.model';
import { CmsErrorHandler } from '../../../../../global/error-handling';
import { MatRadioChange } from '@angular/material/radio';
import { CMS_ENVIROMENT_TOKEN } from '../../../../../global/injection-token';
import { CmsEnviroment } from '../../../../../global/interface';
import { CmsLoadingToggle } from '../../../../../global/service';

export enum GalleryType {
  FILE = 'FILE',
  IMAGE = 'IMAGE',
}

enum StepState {
  MODIFY_IMAGE_APPROACH = 'MODIFY_IMAGE_APPROACH',
  SELECT_FILE = 'SELECT_FILE',
  CROP_FILE = 'CROP_FILE',
  UPLOAD = 'UPLOAD',
}

export interface UploadResponse {
  galleryId: number;
  galleryName: string;
  path: string;
}

interface UploadComponent {
  galleryId: string;
  formGroupSelectFile: FormGroup;
  formGroupCropFile: FormGroup;
  galleryService: GalleryService;
}

interface UploadResolver {
  resolve(component: UploadComponent): Observable<UploadResponse>;
}

type ImageUpdateAction = 'new' | 'crop';

class AddImage implements UploadResolver {
  resolve(component: UploadComponent) {
    const origin: FileUploadModel = component.formGroupSelectFile.get('value').value;
    const cropped: FileUploadModel = component.formGroupCropFile.get('value').value;
    const setting = component.formGroupCropFile.get('setting').value;
    return component.galleryService.addGallery(origin, cropped, setting).pipe(
      map(res => {
        return { ...res, galleryName: origin.fileName };
      })
    );
  }
}

class UpdateImage implements UploadResolver {
  resolve(component: UploadComponent) {
    const cropped: FileUploadModel = component.formGroupCropFile.get('value').value;
    const setting = component.formGroupCropFile.get('setting').value;
    return component.galleryService.updateGallery2(component.galleryId, cropped, setting).pipe(
      map(res => {
        return { ...res, galleryName: cropped.fileName };
      })
    );
  }
}

class AddFile implements UploadResolver {
  resolve(component: UploadComponent) {
    const gallery: FileUploadModel = component.formGroupSelectFile.get('value').value;
    return component.galleryService.addFile(gallery).pipe(
      map(res => {
        return { ...res, galleryName: gallery.fileName };
      })
    );
  }
}

class UpdateFile implements UploadResolver {
  resolve(component: UploadComponent) {
    const gallery: FileUploadModel = component.formGroupSelectFile.get('value').value;
    return component.galleryService.updateFile(component.galleryId, gallery).pipe(
      map(res => {
        return { ...res, galleryName: gallery.fileName };
      })
    );
  }
}

@Component({
  selector: 'cms-gallery-add-update-modal',
  templateUrl: './gallery-add-update-modal.component.html',
  styleUrls: ['./gallery-add-update-modal.component.scss'],
})
export class GalleryAddUpdateModalComponent
  extends CustomModalBase<GalleryAddUpdateModalComponent, UploadResponse>
  implements UploadComponent, OnInit {
  title: string | (() => string) = '';

  GalleryType = GalleryType;
  StepState = StepState;

  @ViewChild('stepper') stepper: MatHorizontalStepper;
  @ViewChild('tempOrigin') tempOrigin: ElementRef<HTMLImageElement>;

  readonly fileUploadInputIdentifier = 'fileUpload';

  @Input() galleryType: GalleryType;
  @Input() galleryId: string;
  @Input() galleryName: string;
  @Input() accept = '';
  @Input() imageHeightWidth: {
    width: number;
    height: number;
  };
  cropSetting;

  galleryConfig: GalleryConfigResponseModel;
  typeText = '';
  currentStepState: StepState;

  formGroupModifyImageApproach: FormGroup;
  formGroupSelectFile: FormGroup;
  formGroupCropFile: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cropperService: CropperService,
    public galleryService: GalleryService,
    private elementRef: ElementRef,
    public modalService: ModalService,
    @Inject(CMS_ENVIROMENT_TOKEN) public environment: CmsEnviroment,
    private cmsLoadingToggle: CmsLoadingToggle,
  ) { super(); }

  ngOnInit() {
    // this.updateSize('1280px');
    if (this.galleryId && this.galleryType === GalleryType.IMAGE) {
      this.currentStepState = StepState.MODIFY_IMAGE_APPROACH;
    } else {
      this.currentStepState = StepState.SELECT_FILE;
    }


    this.typeText = this.getTypeTextByGalleryType(this.galleryType);
    this.title = `${this.galleryId ? '修改' : '加入'}${this.typeText}`;

    this.accept = this.accept || this.getAcceptByGalleryType(this.galleryType);
    this.formGroupModifyImageApproach = this.formBuilder.group({
      value: [null, Validators.required],
    });
    this.formGroupSelectFile = this.formBuilder.group({
      value: [null, Validators.required],
    });
    this.formGroupCropFile = this.formBuilder.group({
      value: [null, Validators.required],
      setting: [null],
    });

    this.getGalleryConfig().subscribe();
  }

  private getGalleryConfig() {
    return this.galleryService.getGalleryConfig().pipe(
      CmsErrorHandler.rxHandleError(),
      tap(config => this.galleryConfig = config),
    );
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

  chooseFile() {
    const galleryConfig = this.galleryConfig;
    if (!galleryConfig) {
      this.modalService.openMessage({ message: '無法取得上傳設定檔，請重整頁面後再試' }).subscribe();
      return;
    }
    try {
      const fileUpload = this.getFileUpload();
      fileUpload.onchange = fileUpload.onchange || (() => {
        const files = Array.from(fileUpload.files);
        fileUpload.value = '';

        if (!files.length) { return; }

        const file = this.galleryService.mapFileToFileUploadModel(files[0]);

        if (galleryConfig.limitCharacter) {
          const limitCharacters = galleryConfig.limitCharacter.split(',');
          if (limitCharacters.some(c => file.fileName.indexOf(c) > -1)) {
            this.modalService.openMessage({ message: `檔名不可含有下列字元 : ${galleryConfig.limitCharacter}` }).subscribe();
            return;
          }
        }

        const ext = file.fileName.substring(file.fileName.lastIndexOf('.') + 1);
        const fileLimit = this.findFileSizeLimitByExt(ext);
        if (!fileLimit) {
          this.modalService.openMessage({ message: `不支援 .${ext}` }).subscribe();
          return;
        }

        if (file.fileSize >= fileLimit.maxFileSize * 1024) {
          this.modalService.openMessage({ message: `上傳大小過大，${ext} 上傳上限為 ${fileLimit.maxFileSize} kb` }).subscribe();
          return;
        }

        this.formGroupSelectFile.get('value').patchValue(file);
        this.stepper.next();
      });

      fileUpload.click();
    } catch (error) {
      CmsErrorHandler.throwAndShow(error, 'GalleryAddUpdateModalComponent.addFile()', '加入檔案錯誤');
    }
  }

  findFileSizeLimitByExt(ext: string) {
    if (!this.galleryConfig) {
      return null;
    }
    const fileLimit = this.galleryConfig.fileLimits.find(limit => limit.fileNameExt.toLowerCase() === ext?.toLowerCase());
    return fileLimit;
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

  private getBase64Image(img: HTMLImageElement, ext) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL(`image/${ext}`);
    return dataURL;
    // return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
  }

  cropFile(file: FileUploadModel) {
    if (file) {
      const cropSettingValue: string = this.formGroupCropFile?.get('setting')?.value;
      const cropSetting: CropSetting = cropSettingValue ? JSON.parse(cropSettingValue) : null;
      const imageHeightWidth = this.imageHeightWidth;
      this.cropperService.openEditor(file.url, { imageHeightWidth, cropSetting }).subscribe(result => {
        if (!result) { return; }
        const blob = this.dataURItoBlob(result.dataUrl);
        const newFile = this.galleryService.mapFileToFileUploadModel(new File([blob], file.data.name, { type: file.fileType }));
        this.formGroupCropFile.get('value').patchValue(newFile);
        this.formGroupCropFile.get('setting').patchValue(result.cropSetting ? JSON.stringify(result.cropSetting) : '');
        this.stepper.next();
      });
    }
  }

  onModifyImageApproachChange(ev: MatRadioChange) {
    const imageAction: ImageUpdateAction = ev.value;
    if (!imageAction) { return; }
    this.formGroupModifyImageApproach.get('value').patchValue(imageAction);
    if (imageAction === 'new') {
      this.clearFormGroupSelectFile();
      this.clearFormGroupCropFile();
      this.stepper.next();
    }
    if (imageAction === 'crop') {
      this.cmsLoadingToggle.open();
      this.getCropSetting().pipe(
        CmsErrorHandler.rxHandleError((error, showMessage) => {
          this.cmsLoadingToggle.close();
          showMessage();
        })
      ).subscribe(res => {
        this.cmsLoadingToggle.close();
        const ext = this.galleryName.substring(this.galleryName.lastIndexOf('.') + 1);
        const originDataURI = this.getBase64Image(this.tempOrigin.nativeElement, ext);
        const originBlob = this.dataURItoBlob(originDataURI);
        const originImage = this.galleryService.mapFileToFileUploadModel(
          new File([originBlob], this.galleryName, { type: `image/${ext}` }));

        this.formGroupSelectFile.get('value').patchValue(originImage);
        this.formGroupCropFile.get('setting').patchValue(res.cropSetting);
        this.stepper.next();
      });
    }
  }

  private getCropSetting() {
    return this.galleryService.getGallerySetting(this.galleryId).pipe(
      CmsErrorHandler.rxHandleError(),
    );
  }

  onStepSelectionChange(ev: StepperSelectionEvent) {
    this.currentStepState = ev.selectedStep.state as StepState;
    if (this.currentStepState === StepState.MODIFY_IMAGE_APPROACH) {
      this.clearFormGroupCropFile();
      this.clearFormGroupSelectFile();
      this.clearFormGroupModifyImageApproach();
    }
    if (this.currentStepState === StepState.SELECT_FILE) {
      this.clearFormGroupCropFile();
    }
  }

  private clearFormGroupModifyImageApproach() {
    this.formGroupModifyImageApproach.get('value').patchValue(null);
  }

  private clearFormGroupSelectFile() {
    this.formGroupSelectFile.get('value').patchValue(null);
  }

  private clearFormGroupCropFile() {
    this.formGroupCropFile.get('value').patchValue(null);
    this.formGroupCropFile.get('setting').patchValue(null);
  }

  private getUploadResolver() {
    let resolver: UploadResolver;

    if (this.galleryId) { // 修改
      if (this.galleryType === GalleryType.FILE) {
        resolver = new UpdateFile();
      }
      if (this.galleryType === GalleryType.IMAGE) {
        const imageAction: ImageUpdateAction = this.formGroupModifyImageApproach.get('value').value;
        if (imageAction === 'new') {
          resolver = new AddImage();
        }
        if (imageAction === 'crop') {
          resolver = new UpdateImage();
        }
      }
    } else { // 新增
      if (this.galleryType === GalleryType.FILE) {
        resolver = new AddFile();
      }
      if (this.galleryType === GalleryType.IMAGE) {
        resolver = new AddImage();
      }
    }

    return resolver;
  }

  upload() {
    const resolver = this.getUploadResolver();
    this.cmsLoadingToggle.open();
    resolver.resolve(this).pipe(
      CmsErrorHandler.rxHandleError((error, showMessage) => {
        this.cmsLoadingToggle.close();
        showMessage();
      })
    ).subscribe(res => {
      this.cmsLoadingToggle.close();
      this.close(res);
    });
  }

}
