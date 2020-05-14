import { Component, OnInit, Input, Inject, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef, AfterViewInit, EventEmitter, Output, ChangeDetectorRef, QueryList, ElementRef, HostListener, HostBinding } from '@angular/core';
import { TemplateInfo } from '../../interface';
import { COMPONENT_SERVICE_TOKEN } from '../../injection-token';
import { LayoutBase } from '../layout-base/layout-base.interface';
import { takeUntil, map } from 'rxjs/operators'
import { merge } from 'rxjs';
import { LayoutWrapperSelectEvent, LayoutWrapper, TemplateFieldSelectEvent, LayoutWrapperSelectedTargetType } from './layout-wrapper.interface';
import { LayoutWrapperBase } from './layout-wrapper-base';

@Component({
  selector: 'layout-wrapper',
  templateUrl: './layout-wrapper.component.html',
  styleUrls: ['./layout-wrapper.component.scss']
})
export class LayoutWrapperComponent extends LayoutWrapperBase implements LayoutWrapper, OnInit, AfterViewInit {

  @HostBinding('class.now-hover') nowHover: boolean;

  @Input() templateInfo: TemplateInfo;
  @Input() mode: 'preview' | 'edit' = 'preview';

  @ViewChild('DynamicHost', { read: ViewContainerRef }) host: ViewContainerRef;

  componentRef: ComponentRef<LayoutBase<TemplateInfo>>;

  @Output() select = new EventEmitter<LayoutWrapperSelectEvent>();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(COMPONENT_SERVICE_TOKEN) private componentFactory: any,
    private _changeDetectorRef: ChangeDetectorRef,
    private _elementRef: ElementRef
  ) {
    super();
    this._changeDetectorRef.detach();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this._changeDetectorRef.reattach();
    this.loadComponent();
    this.setMode(this.mode || 'preview');
  }

  loadComponent() {
    this._changeDetectorRef.detectChanges();
    this.host.clear();
    const componentRef = this._createComponentRef();
    this._setInstanceProperties(componentRef?.instance);
    this.componentRef = componentRef;
    this._changeDetectorRef.detectChanges();
    this._registerInstanceSelectEvents(componentRef?.instance);
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
      instance.mode = this.getMode();
      instance.parentLayoutWrapper = this;
    }
  }

  private _registerInstanceSelectEvents(instance: LayoutBase<TemplateInfo>) {
    const childLayoutWrappers = (instance?.childLayoutWrappers || new QueryList()) as QueryList<LayoutWrapperComponent>;
    const templateFieldDirectives = (instance?.templateFieldDirectives || new QueryList());
    merge(...[
      merge(...childLayoutWrappers.map(c => c.select).filter(l => !!l)),
      merge(...templateFieldDirectives.map(c => c.select).filter(l => !!l))
        .pipe(
          map((e: TemplateFieldSelectEvent) => this.createLayoutWrapperSelectEvent(e)),
        )
    ]).pipe(
      takeUntil(this.destroy$),
    ).subscribe((e: LayoutWrapperSelectEvent) => this.select.next(e));
  }

  createLayoutWrapperSelectEvent(templateFieldSelectEvent?: TemplateFieldSelectEvent) {
    const event: LayoutWrapperSelectEvent = {
      selectedTarget: this._elementRef?.nativeElement,
      selectedTargetType: LayoutWrapperSelectedTargetType.TEMPLATE,
      wrapper: this,
      componentRef: this.componentRef,
      templateInfo: this.templateInfo,
      templateType: this.componentRef?.instance?.templateType,
      ...(templateFieldSelectEvent || {}),
    };
    return event;
  }

  setMode(mode: 'preview' | 'edit') {
    super.setMode(mode);
    const instance = this.componentRef?.instance;
    if (instance) {
      instance.mode = mode;
      const childLayoutWrappers = instance?.childLayoutWrappers || new QueryList();
      childLayoutWrappers.forEach(c => c.setMode(mode));
      const templateFieldDirectives = instance?.templateFieldDirectives || new QueryList();
      templateFieldDirectives.forEach(d => d.setMode(mode))
    }
  }

  @HostListener('click') click() {
    if (this.getMode() === 'edit') {
      this.select.next(this.createLayoutWrapperSelectEvent());
    }
  }

}
