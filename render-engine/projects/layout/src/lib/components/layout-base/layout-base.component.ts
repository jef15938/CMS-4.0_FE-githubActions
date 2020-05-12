import { OnInit, Input, AfterViewInit, ComponentFactoryResolver, ViewContainerRef, ComponentRef, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { TemplateInfo } from '../../interface';


export abstract class LayoutBaseComponent<TInfo extends TemplateInfo> implements OnInit, AfterViewInit {

  private _templateInfo: TInfo;
  private _isViewInit: boolean = false;

  get isViewInit() {
    return this._isViewInit;
  }

  @Input()
  public get templateInfo(): TInfo {
    return this._templateInfo;
  }
  public set templateInfo(value: TInfo) {
    this._templateInfo = value;
    console.log('set templateInfo:', value);
  }

  @Output() mouseEnter = new EventEmitter();
  @Output() mouseLeave = new EventEmitter();
  @Output() select = new EventEmitter();

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
