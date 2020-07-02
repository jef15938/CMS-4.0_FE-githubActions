import { Pipe, PipeTransform, ComponentRef } from '@angular/core';
import { CustomCellRenderer } from '../table.interface';

@Pipe({
  name: 'cellRenderOnload'
})
export class CellRenderOnloadPipe implements PipeTransform {

  transform(table, data): (componentRef: ComponentRef<CustomCellRenderer>) => void {
    return (componentRef: ComponentRef<CustomCellRenderer>) => {
      const instance = componentRef.instance;
      if (instance?.compInit) {
        instance.compInit({
          table,
          data,
        });
      }
    };
  }

}
