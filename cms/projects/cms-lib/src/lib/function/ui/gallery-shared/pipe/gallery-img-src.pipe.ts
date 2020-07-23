import { Pipe, PipeTransform } from '@angular/core';
import { GalleryInfo } from '../../../../global/api/neuxAPI/bean/GalleryInfo';

@Pipe({
  name: 'gelleryImgSrc'
})
export class GelleryImgSrcPipe implements PipeTransform {

  constructor() { }

  transform(data: GalleryInfo, args?: any): string {
    if (data) {
      const isImg = this.isImg(data);
      const path =
        isImg
          ? `${data.url}`
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
