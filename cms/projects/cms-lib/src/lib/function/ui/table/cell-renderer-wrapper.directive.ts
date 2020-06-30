import { Directive, ViewContainerRef, Input, ComponentFactoryResolver, Type } from '@angular/core';
import { CustomCellRenderer } from './table.interface';

@Directive({
  selector: '[cmsCellRendererWrapper]'
})
export class CellRendererWrapperDirective {

  @Input() table;
  @Input() data;
  @Input() customRenderer: Type<any>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) { }

  render() {

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.customRenderer);
    this.viewContainerRef.clear();
    const componentRef = this.viewContainerRef.createComponent(componentFactory);
    const instance = componentRef.instance as CustomCellRenderer;
    if (instance.compInit && typeof (instance.compInit) === 'function') {
      instance.compInit({
        table: this.table,
        data: this.data,
      });
    }
  }

}
