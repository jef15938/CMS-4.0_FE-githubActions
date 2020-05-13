import { Component, OnInit, Input, Inject, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef, AfterViewInit, EventEmitter, Output, ChangeDetectorRef, ViewChildren, QueryList, ElementRef, OnDestroy } from '@angular/core';
import { TemplateInfo } from '../../../interface';
import { COMPONENT_SERVICE_TOKEN } from '../../../injection-token';
import { LayoutBase } from '../layout-base.interface';
import { tap, takeUntil } from 'rxjs/operators'
import { merge, Subject } from 'rxjs';
import { LayoutWrapperSelectEvent, LayoutWrapper } from './layout-wrapper.interface';

@Component({
  selector: 'layout-wrapper',
  templateUrl: './layout-wrapper.component.html',
  styleUrls: ['./layout-wrapper.component.scss']
})
export class LayoutWrapperComponent implements LayoutWrapper, OnInit, AfterViewInit, OnDestroy {

  @Input() templateInfo: TemplateInfo;

  mode: 'preview' | 'edit' = 'preview';

  nowHover = false;
  nowEdit = false;

  @ViewChild('DynamicHost', { read: ViewContainerRef }) host: ViewContainerRef;
  @ViewChild('WrapperContainer') containerDiv: ElementRef;

  @ViewChildren(LayoutWrapperComponent) children: QueryList<LayoutWrapperComponent>;

  componentRef: ComponentRef<LayoutBase<TemplateInfo>>;

  @Output() select = new EventEmitter<LayoutWrapperSelectEvent>();

  private _destroy$ = new Subject();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(COMPONENT_SERVICE_TOKEN) private componentFactory: any,
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.loadComponent();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._destroy$.unsubscribe();
  }

  loadComponent() {
    this.host.clear();
    const componentRef = this._createComponentRef();
    this._setInstanceProperties(componentRef?.instance);
    // console.log('load component:', componentRef);
    this.componentRef = componentRef;
    this._changeDetectorRef.detectChanges();
    this._registerInstanceEvent(componentRef?.instance);
  }

  private _createComponentRef(): ComponentRef<LayoutBase<TemplateInfo>> {
    const componentClass = this.componentFactory.getComponent(this.templateInfo.templateId);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    const componentRef = this.host.createComponent(componentFactory) as ComponentRef<LayoutBase<TemplateInfo>>;
    return componentRef;
  }

  private _setInstanceProperties(instance: LayoutBase<TemplateInfo>): void {
    if (instance) {
      instance.templateInfo = this.templateInfo;
      instance.mode = this.mode;
      instance.parentLayoutWrapper = this;
    }
  }

  private _registerInstanceEvent(instance: LayoutBase<TemplateInfo>) {
    if (instance.childLayoutWrappers) {
      const childLayoutWrappers = instance.childLayoutWrappers as QueryList<LayoutWrapperComponent>;
      merge(...[
        merge(...childLayoutWrappers.map(c => c.select).filter(l => !!l)).pipe(tap(e => this.select.next(e as LayoutWrapperSelectEvent))),
      ]).pipe(takeUntil(this._destroy$)).subscribe();
    }
  }

  emitSelectEvent(selectedTarget){
    const event: LayoutWrapperSelectEvent = {
      selectedTarget,
      wrapper: this as any,
      componentRef: this.componentRef,
      templateInfo: this.templateInfo,
    }
    this.select.next(event);
  }

  setMode(mode: 'preview' | 'edit') {
    this.mode = mode;
    if (this.componentRef?.instance) {
      this.componentRef.instance.mode = mode;
    }
  }

}
