import { Input, ComponentRef, ChangeDetectorRef, ComponentFactoryResolver, AfterViewInit, ViewContainerRef, Injector } from '@angular/core';

export abstract class DynamicWrapperBase<TComponent> implements AfterViewInit {

  protected abstract host: ViewContainerRef;

  @Input() componentClass;
  @Input() onComponentLoad: (componentRef: ComponentRef<TComponent>) => void;

  protected changeDetectorRef: ChangeDetectorRef;
  protected componentFactoryResolver: ComponentFactoryResolver;

  componentRef: ComponentRef<TComponent>;

  constructor(
    protected injector: Injector,
  ) {
    this.changeDetectorRef = this.injector.get(ChangeDetectorRef);
    this.componentFactoryResolver = this.injector.get(ComponentFactoryResolver);
  }

  ngAfterViewInit(): void {
    if (!this.componentClass) { return; }
    this.loadWithComponent(this.componentClass);
  }

  loadWithComponent(componentClass) {
    if (!this.host) { throw (new Error('No host')); }
    if (!componentClass) { throw (new Error('No componentClass')); }
    this.host.clear();
    const componentRef = this.createComponentRef(componentClass);
    if (this.onComponentLoad) {
      this.onComponentLoad(componentRef);
    }
    this.componentRef = componentRef;
    this.changeDetectorRef.detectChanges(); // 讓內含的畫面長出，ViewChild/ViewChildren才會更新
  }

  protected createComponentRef(renderComponentClass): ComponentRef<TComponent> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory<TComponent>(renderComponentClass);
    const componentRef = this.host.createComponent(componentFactory);
    return componentRef;
  }

}
