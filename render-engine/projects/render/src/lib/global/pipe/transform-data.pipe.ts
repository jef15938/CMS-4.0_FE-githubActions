import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformData'
})
export class TransformDataPipe implements PipeTransform {

  constructor() { }

  transform<TData, TResult>(value: TData[], transformFunction: (data: TData) => TResult): TResult[] {
    if (!value || !transformFunction || typeof (transformFunction) !== 'function') {
      throw new Error('資料異常');
    }

    if (!transformFunction) {
      throw new Error('無function');
    }

    if (typeof (transformFunction) !== 'function') {
      throw new Error('型別不是function');
    }

    return value.map(transformFunction);
  }

}
