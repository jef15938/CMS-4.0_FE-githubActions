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
      const extensionName = isLocalFile ? data.fileName.substring(data.fileName.lastIndexOf('.') + 1) : data.fileType.toLowerCase();
      const isImg = this.isImg(extensionName, isLocalFile);
      const path = isImg
        ? (isLocalFile ? data.url : `${this.environment.apiBaseUrl}${data.url}`)
        : `./assets/img/icon/${extensionName}.png`;
      return path;
    } else {
      return '';
    }
  }

  private isImg(extensionName: string, isLocalFile: boolean): boolean {
    // PDF,DOC,DOCX,XLS,XLSX
    // PNG,JPG,JPEG,GIF
    const imgFileExtensionNames = ['PNG', 'JPG', 'JPEG', 'GIF'];
    return imgFileExtensionNames.map(e => e.toLowerCase()).indexOf(extensionName?.toLowerCase()) > -1;
  }

}
