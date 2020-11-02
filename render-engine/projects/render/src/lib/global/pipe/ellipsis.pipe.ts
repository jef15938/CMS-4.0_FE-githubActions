import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ellipsis' })
export class EllipsisPipe implements PipeTransform {

  constructor() { }

  transform(value: string, total: number) {
    if (!value) { return ''; }
    const headString = value.substring(0, total);
    if (total > value.length) {
      return `${headString}`;
    }

    return `${headString}...`;
  }
}
