import { Pipe, PipeTransform } from '@angular/core';
import { GalleryInfo } from '../../../../global/api/neuxAPI/bean/GalleryInfo';
import { GalleryService } from '../../../../global/api/service/gallery/gallery.service';

@Pipe({
  name: 'gelleryImgSrc'
})
export class GelleryImgSrcPipe implements PipeTransform {

  private galleryShowUrl: string;

  constructor(
    galleryService: GalleryService,
  ) {
    this.galleryShowUrl = galleryService.getGalleryShowUrl();
  }

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
    return imgFileExtensionNames.indexOf(extensionName) > -1;
  }

  private getLocalUrl() {
    const urlFragments = window.location.href.split('/');
    return `${urlFragments[0]}//${urlFragments[2]}`;
  }

}
