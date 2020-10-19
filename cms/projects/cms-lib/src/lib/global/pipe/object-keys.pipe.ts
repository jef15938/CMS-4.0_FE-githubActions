import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectKeys'
})
export class ObjectKeysPipe implements PipeTransform {

  transform(value: { [key: string]: any }, ...args: unknown[]): string[] {
    if (!value) { return []; }
    return Object.keys(value);
  }

}
