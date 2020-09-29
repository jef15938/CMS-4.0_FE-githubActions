import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformData'
})
export class TransformDataPipe implements PipeTransform {

  constructor() { }

  transform<TData, TResult>(value: TData[], transformFunction: (data: TData) => TResult): TResult[] {
    if (!value || !transformFunction || typeof (transformFunction) !== 'function') {
      return [];
    }

    return value.map(transformFunction);
  }

}
