import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ellipsis' })
export class EllipsisPipe implements PipeTransform {

  constructor() { }

  transform(value: string, middleText: string, headLength: number, tailLength: number) {
    if (!value) { return ''; }
    const headString = value.substring(0, headLength);
    const tailString = value.substring(value.length - tailLength - 1);
    if (headLength > value.length) {
      return `${headString}`;
    }

    return `${headString}${middleText}${tailString}`;
  }
}
