import { Component, OnInit, Input, Inject, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef, AfterViewInit, EventEmitter, Output, ChangeDetectorRef, QueryList, ElementRef, HostListener, OnChanges, SimpleChanges } from '@angular/core';
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
export class LayoutWrapperComponent extends LayoutWrapperBase implements
  LayoutWrapper, OnInit, AfterViewInit, OnChanges {

  @Input() templateInfo: TemplateInfo;
  @Input() mode: 'preview' | 'edit' = 'edit';

  @ViewChild('DynamicHost', { read: ViewContainerRef }) host: ViewContainerRef;

  parentTemplatesContainer: { templates: TemplateInfo[]; };

  componentRef: ComponentRef<LayoutBase<TemplateInfo>>;

  @Output() select = new EventEmitter<LayoutWrapperSelectEvent>();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(COMPONENT_SERVICE_TOKEN) private componentFactory: any,
    changeDetectorRef: ChangeDetectorRef,
    elementRef: ElementRef,
  ) {
    super(changeDetectorRef, elementRef);
    this._changeDetectorRef.detach();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mode']) {
      this.setMode();
    }
  }

  ngAfterViewInit() {
    this._changeDetectorRef.reattach();
    this.loadComponent();
    this.setMode();
  }

  loadComponent() {
    this._changeDetectorRef.detectChanges();
    this.host.clear();
    const componentRef = this._createComponentRef();
    this._setInstanceProperties(componentRef?.instance);
    this.componentRef = componentRef;
    this._changeDetectorRef.detectChanges(); // 讓內含的畫面長出，ViewChild/ViewChildren才會更新
    this._registerInstanceSelectEvents(componentRef?.instance);
    this._registerInstanceEnterLeaveEvents(componentRef?.instance);
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

  private _registerInstanceSelectEvents(instance: LayoutBase<TemplateInfo>) {
    const templatesContainerComponents = (instance?.templatesContainerComponents || new QueryList()) as QueryList<LayoutWrapperComponent>;
    const templateFieldDirectives = (instance?.templateFieldDirectives || new QueryList());
    merge(...[
      merge(...templatesContainerComponents.map(c => c.select).filter(l => !!l)),
      merge(...templateFieldDirectives.map(c => c.select).filter(l => !!l))
        .pipe(
          map((e: TemplateFieldSelectEvent) => this.createLayoutWrapperSelectEvent(e)),
        )
    ]).pipe(
      takeUntil(this.destroy$),
    ).subscribe((e: LayoutWrapperSelectEvent) => this.select.next(e));
  }

  private _registerInstanceEnterLeaveEvents(instance: LayoutBase<TemplateInfo>) {
    const templatesContainerComponents = (instance?.templatesContainerComponents || new QueryList()) as QueryList<LayoutWrapperComponent>;
    const templateFieldDirectives = (instance?.templateFieldDirectives || new QueryList());
    // enter
    merge(...[
      merge(...templatesContainerComponents.map(c => c.enter).filter(l => !!l)),
      merge(...templateFieldDirectives.map(c => c.enter).filter(l => !!l)),
    ]).pipe(
      takeUntil(this.destroy$),
    ).subscribe((e: HTMLElement) => this.enter.next(e));
    // leave
    merge(...[
      merge(...templatesContainerComponents.map(c => c.leave).filter(l => !!l)),
      merge(...templateFieldDirectives.map(c => c.leave).filter(l => !!l)),
    ]).pipe(
      takeUntil(this.destroy$),
    ).subscribe((e: HTMLElement) => this.leave.next(e));
  }

  createLayoutWrapperSelectEvent(templateFieldSelectEvent?: TemplateFieldSelectEvent) {
    const event: LayoutWrapperSelectEvent = {
      selectedTarget: this.elementRef?.nativeElement,
      selectedTargetType: LayoutWrapperSelectedTargetType.TEMPLATE,
      wrapper: this,
      componentRef: this.componentRef,
      templateInfo: this.templateInfo,
      templateType: this.componentRef?.instance?.templateType,
      ...(templateFieldSelectEvent || {}),
    };
    return event;
  }

  setMode() {
    const mode = this.mode || 'preview';
    const instance = this.componentRef?.instance;
    if (instance) {
      instance.mode = mode;
      const templatesContainerComponents = instance?.templatesContainerComponents || new QueryList();
      templatesContainerComponents.forEach(c => c.mode = mode);
      const templateFieldDirectives = instance?.templateFieldDirectives || new QueryList();
      templateFieldDirectives.forEach(d => d.mode = mode);
    }
  }

  @HostListener('click') click() {
    if (this.mode === 'edit') {
      this.select.emit(this.createLayoutWrapperSelectEvent());
    }
  }

}
