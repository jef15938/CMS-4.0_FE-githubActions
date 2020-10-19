import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newLineReplace'
})
export class NewLineReplacePipe implements PipeTransform {

  constructor() { }

  transform(value: string, args?: any): string {
    const reg = new RegExp(/\r*\n/, 'g');
    return (value || '').replace(reg, '<br>');
  }

}
