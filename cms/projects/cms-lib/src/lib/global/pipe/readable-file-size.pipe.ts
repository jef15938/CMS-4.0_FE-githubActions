import { Pipe, PipeTransform } from '@angular/core';
import { FileUtil } from '../util/file.util';

@Pipe({
  name: 'readableFileSize'
})
export class ReadableFileSizePipe implements PipeTransform {

  transform(size: number, unitDepth = 99): string {
    return FileUtil.readableFileSize(size, unitDepth);
  }

}
