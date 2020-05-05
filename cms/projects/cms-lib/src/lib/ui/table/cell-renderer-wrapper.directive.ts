import { Directive, ViewContainerRef, Input, ComponentFactoryResolver, Type, TemplateRef } from '@angular/core';
import { CustomCellRenderer } from './table.interface';

@Directive({
  selector: '[cmsCellRendererWrapper]'
})
export class CellRendererWrapperDirective {

  @Input() table;
  @Input() data;
  @Input() customRenderer: Type<any>;

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _viewContainerRef: ViewContainerRef
  ) { }

  render() {

    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.customRenderer);
    this._viewContainerRef.clear();
    const componentRef = this._viewContainerRef.createComponent(componentFactory);
    const instance = componentRef.instance as CustomCellRenderer;
    if (instance.compInit && typeof (instance.compInit) === 'function') {
      instance.compInit({
        data: this.data,
      });
    }
  }

}
