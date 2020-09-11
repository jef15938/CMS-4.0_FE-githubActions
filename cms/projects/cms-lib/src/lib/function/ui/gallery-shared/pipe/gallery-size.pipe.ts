import { Pipe, PipeTransform } from '@angular/core';
import { GalleryInfoModel } from '../../../../global/api/data-model/models/gallery-info.model';
import { FileUtil } from '../../../../global/util/file.util';

@Pipe({
  name: 'gellerySize'
})
export class GellerySizePipe implements PipeTransform {

  constructor() { }

  transform(size: string | number, args?: any): string {
    if (!size) { return ''; }
    return FileUtil.readableFileSize(+size);
  }

}
