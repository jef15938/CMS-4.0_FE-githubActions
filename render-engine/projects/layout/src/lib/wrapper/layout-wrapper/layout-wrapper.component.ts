import { Component, OnInit, Input, Inject, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef, AfterViewInit, EventEmitter, Output, ChangeDetectorRef, QueryList, ElementRef, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import { TemplateInfo } from '../../interface';
import { COMPONENT_SERVICE_TOKEN } from '../../injection-token';
import { LayoutBase } from '../layout-base/_base.interface';
import { takeUntil, map, tap } from 'rxjs/operators'
import { merge, Subscription } from 'rxjs';
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

  private instanceEventSubscription: Subscription;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(COMPONENT_SERVICE_TOKEN) private componentFactory: any,
    changeDetectorRef: ChangeDetectorRef,
    elementRef: ElementRef,
  ) {
    super(changeDetectorRef, elementRef);
    this.changeDetectorRef.detach();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mode']) {
      this.setMode();
    }
    if (changes['templateInfo'] && this.componentRef?.instance) {
      this.componentRef.instance.templateInfo = this.templateInfo;
      if (this.componentRef?.instance?.ngOnChanges) {
        this.componentRef.instance.ngOnChanges(changes);
      }
    }
  }

  ngAfterViewInit() {
    this.changeDetectorRef.reattach();
    this.loadComponent();
    this.checkEventBinding();
    this.setMode();
  }

  loadComponent() {
    this.changeDetectorRef.detectChanges();
    this.host.clear();
    const componentRef = this.createComponentRef();
    this.setInstanceProperties(componentRef?.instance);
    this.componentRef = componentRef;
    this.changeDetectorRef.detectChanges(); // 讓內含的畫面長出，ViewChild/ViewChildren才會更新
  }

  private createComponentRef(): ComponentRef<LayoutBase<TemplateInfo>> {
    const componentClass = this.componentFactory.getComponent(this.templateInfo.templateId);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    const componentRef = this.host.createComponent(componentFactory) as ComponentRef<LayoutBase<TemplateInfo>>;
    return componentRef;
  }

  private setInstanceProperties(instance: LayoutBase<TemplateInfo>): void {
    if (instance) {
      instance.templateInfo = this.templateInfo;
      instance.mode = this.mode;
      instance.parentLayoutWrapper = this;
    }
  }

  checkEventBinding() {
    if (this.instanceEventSubscription) { this.instanceEventSubscription.unsubscribe(); }
    this.instanceEventSubscription =
      this.registerInstanceEvents(this.componentRef?.instance).pipe(takeUntil(this.destroy$)).subscribe();
  }

  private registerInstanceEvents(instance: LayoutBase<TemplateInfo>) {
    const templatesContainerComponents = (instance?.templatesContainerComponents || new QueryList()) as QueryList<LayoutWrapperComponent>;
    const templateFieldDirectives = (instance?.templateFieldDirectives || []);
    return merge(
      // select
      merge(
        merge(...templatesContainerComponents.map(c => c.select).filter(l => !!l)),
        merge(...templateFieldDirectives.map(c => c.select).filter(l => !!l))
          .pipe(map((e: TemplateFieldSelectEvent) => this.createLayoutWrapperSelectEvent(e)))
      ).pipe(tap((e: LayoutWrapperSelectEvent) => this.select.next(e))),
      // enter
      merge(
        merge(...templatesContainerComponents.map(c => c.enter).filter(l => !!l)),
        merge(...templateFieldDirectives.map(c => c.enter).filter(l => !!l)),
      ).pipe(tap((e: HTMLElement) => this.enter.next(e))),
      // leave
      merge(
        merge(...templatesContainerComponents.map(c => c.leave).filter(l => !!l)),
        merge(...templateFieldDirectives.map(c => c.leave).filter(l => !!l)),
      ).pipe(tap((e: HTMLElement) => this.leave.next(e)))
    )
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
