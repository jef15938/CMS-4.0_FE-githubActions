import { Pipe, PipeTransform, Inject } from '@angular/core';
import { CMS_ENVIROMENT_TOKEN } from '../../../../global/injection-token/cms-injection-token';
import { CmsEnviroment } from '../../../../global/interface';
import { GalleryInfoModel } from '../../../../global/api/data-model/models/gallery-info.model';

@Pipe({
  name: 'gelleryImgSrc'
})
export class GelleryImgSrcPipe implements PipeTransform {

  constructor(
    @Inject(CMS_ENVIROMENT_TOKEN) private environment: CmsEnviroment,
  ) { }

  transform(data: GalleryInfoModel, args?: any): string {
    if (data) {
      const isImg = this.isImg(data);
      const path =
        isImg
          ? `${this.environment.apiBaseUrl}${data.url}?version=${new Date().getTime()}`
          : `./assets/img/icon/${data.fileType.toLowerCase()}.png`;
      return path;
    } else {
      return '';
    }
  }

  private isImg(data: GalleryInfoModel): boolean {
    // PDF,DOC,DOCX,XLS,XLSX
    // PNG,JPG,JPEG,GIF
    const imgFileExtensionNames = ['PNG', 'JPG', 'JPEG', 'GIF'];
    const extensionName = data.fileType.toUpperCase();
    return imgFileExtensionNames.indexOf(extensionName) > -1;
  }

}
