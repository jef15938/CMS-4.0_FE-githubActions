import { Pipe, PipeTransform, Inject } from '@angular/core';
import { CMS_ENVIROMENT_TOKEN } from '../../../../global/injection-token/cms-injection-token';
import { CmsEnviroment } from '../../../../global/interface';

interface Data {
  fileName: string;
  fileType: string;
  url: string;
}

@Pipe({
  name: 'gelleryImgSrc'
})
export class GelleryImgSrcPipe implements PipeTransform {

  constructor(
    @Inject(CMS_ENVIROMENT_TOKEN) private environment: CmsEnviroment,
  ) { }

  transform(data: Data, isLocalFile = false): string {
    if (data) {
      const isImg = this.isImg(data, isLocalFile);

      const path =
        isImg
          ? (isLocalFile ? data.url : `${this.environment.apiBaseUrl}${data.url}`)
          : `./assets/img/icon/${isLocalFile ? data.fileName.substring(data.fileName.lastIndexOf('.') + 1) : data.fileType.toLowerCase()}.png`;
      console.warn(data, isImg, path);
      return path;
    } else {
      return '';
    }
  }

  private isImg(data: Data, isLocalFile: boolean): boolean {
    // PDF,DOC,DOCX,XLS,XLSX
    // PNG,JPG,JPEG,GIF
    const imgFileExtensionNames = ['PNG', 'JPG', 'JPEG', 'GIF'];
    const extensionName = (
      isLocalFile
        ? data.fileName.substring(data.fileName.lastIndexOf('.') + 1)
        : data.fileType
    ).toUpperCase();
    return imgFileExtensionNames.indexOf(extensionName) > -1;
  }

}
