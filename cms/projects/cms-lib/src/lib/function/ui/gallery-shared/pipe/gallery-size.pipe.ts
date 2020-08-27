import { Pipe, PipeTransform } from '@angular/core';
import { GalleryInfoModel } from '../../../../global/api/data-model/models/gallery-info.model';
import { FileUtil } from '../../../../global/util/file.util';

@Pipe({
  name: 'gellerySize'
})
export class GellerySizePipe implements PipeTransform {

  constructor() { }

  transform(data: GalleryInfoModel, args?: any): string {
    if (!data?.size) { return ''; }
    return FileUtil.readableFileSize(+data.size);
  }

}
