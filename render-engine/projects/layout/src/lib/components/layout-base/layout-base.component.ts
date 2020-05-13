import { OnInit, Input, AfterViewInit, ComponentFactoryResolver, ViewContainerRef, ComponentRef, ChangeDetectorRef, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import { TemplateInfo } from '../../interface/template-info.interface';
import { LayoutBase } from './layout-base.interface';
import { LayoutWrapperComponent } from './layout-wrapper/layout-wrapper.component';


export abstract class LayoutBaseComponent<TInfo extends TemplateInfo> implements LayoutBase<TInfo>, OnInit, AfterViewInit {

  parentLayoutWrapper: LayoutWrapperComponent;
  @ViewChildren(LayoutWrapperComponent) childLayoutWrappers: QueryList<LayoutWrapperComponent>;

  private _templateInfo: TInfo;
  private _isViewInit: boolean = false;

  get isViewInit() {
    return this._isViewInit;
  }

  @Input() mode: 'preview' | 'edit' = 'preview';

  @Input()
  public get templateInfo(): TInfo {
    return this._templateInfo;
  }
  public set templateInfo(value: TInfo) {
    this._templateInfo = value;
    console.log('set templateInfo:', value);
  }

  constructor(
    protected componentFactory: any,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  abstract renderComponent(): void;

  ngAfterViewInit(): void {
    this._isViewInit = true;
  }

  protected embedView(vc: ViewContainerRef, componentID: string): ComponentRef<any> {
    const componentClass = this.componentFactory.getComponent(componentID);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    vc.clear();
    const componentRef = vc.createComponent(componentFactory);
    return componentRef;
  }

}
