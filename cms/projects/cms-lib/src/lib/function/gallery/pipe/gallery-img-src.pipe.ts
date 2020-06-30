import { Pipe, PipeTransform, Inject } from '@angular/core';
import { CMS_ENVIROMENT } from '../../../global/injection-token';
import { CmsEnviroment } from '../../../global/interface';
import { GalleryInfo } from '../../../global/api/neuxAPI/bean/GalleryInfo';

@Pipe({
  name: 'gelleryImgSrc'
})
export class GelleryImgSrcPipe implements PipeTransform {

  private galleryShowUrl = '';

  constructor(
    @Inject(CMS_ENVIROMENT) environment: CmsEnviroment,
  ) {
    this.galleryShowUrl = `${environment.apiBaseUrl}/Gallery/Show`;
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
