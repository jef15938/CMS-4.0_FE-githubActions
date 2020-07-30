import { Pipe, PipeTransform, Inject } from '@angular/core';
import { GalleryInfo } from '../../../../global/api/neuxAPI/bean/GalleryInfo';
import { CMS_ENVIROMENT_TOKEN } from '../../../../global/injection-token/cms-injection-token';
import { CmsEnviroment } from '../../../../global/interface';

@Pipe({
  name: 'gelleryImgSrc'
})
export class GelleryImgSrcPipe implements PipeTransform {

  constructor(
    @Inject(CMS_ENVIROMENT_TOKEN) private environment: CmsEnviroment,
  ) { }

  transform(data: GalleryInfo, args?: any): string {
    if (data) {
      const isImg = this.isImg(data);
      const path =
        isImg
          ? `${this.environment.apiBaseUrl}/${data.url}`
          : `${this.getLocalUrl()}/assets/img/icon/${data.file_type.toLowerCase()}.png`;
      return path;
    } else {
      return '';
    }
  }

  private isImg(data: GalleryInfo): boolean {
    // PDF,DOC,DOCX,XLS,XLSX
    // PNG,JPG,JPEG,GIF
    const imgFileExtensionNames = ['PNG', 'JPG', 'JPEG', 'GIF'];
    const extensionName = data.file_type.toUpperCase();
    return imgFileExtensionNames.indexOf(extensionName) > -1;
  }

  private getLocalUrl() {
    const urlFragments = window.location.href.split('/');
    return `${urlFragments[0]}//${urlFragments[2]}`;
  }

}
