import { Pipe, PipeTransform } from '@angular/core';
import { GalleryInfo } from './../../../../neuxAPI/bean/GalleryInfo';

@Pipe({
  name: 'gelleryImgSrc'
})
export class GelleryImgSrcPipe implements PipeTransform {

  readonly galleryShowUrl = 'https://cms.decoder.com.tw/Gallery/Show';

  constructor() { }

  transform(data: GalleryInfo, args?: any): string {
    if (data) {
      return this.isImg(data)
        ? `${this.galleryShowUrl}/${data.gallery_id}`
        : `${this.getLocalUrl()}/assets/img/icon/${data.file_type}.png`;
    } else {
      return '';
    }
  }

  private isImg(data: GalleryInfo): boolean {
    // PDF,DOC,DOCX,XLS,XLSX
    // PNG,JPG,JPEG,GIF
    const imgFileExtensionNames = ['PNG', 'JPG', 'JPEG', 'GIF'];
    const extensionName = data.file_type.toUpperCase();
    console.warn('extensionName = ', extensionName);
    return imgFileExtensionNames.indexOf(extensionName) > -1;
  }

  private getLocalUrl() {
    const urlFragments = window.location.href.split('/');
    return `${urlFragments[0]}//${urlFragments[2]}`;
  }

}
