import { Component, OnInit, Input, Inject, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef, AfterViewInit, EventEmitter, Output, ChangeDetectorRef, ViewChildren, QueryList, ElementRef, OnDestroy, HostListener } from '@angular/core';
import { TemplateInfo } from '../../interface';
import { COMPONENT_SERVICE_TOKEN } from '../../injection-token';
import { LayoutBase } from '../layout-base/layout-base.interface';
import { takeUntil, map } from 'rxjs/operators'
import { merge, Subject } from 'rxjs';
import { LayoutWrapperSelectEvent, LayoutWrapper, TemplateFieldSelectEvent, LayoutWrapperSelectedTargetType } from './layout-wrapper.interface';

@Component({
  selector: 'layout-wrapper',
  templateUrl: './layout-wrapper.component.html',
  styleUrls: ['./layout-wrapper.component.scss']
})
export class LayoutWrapperComponent implements LayoutWrapper, OnInit, AfterViewInit, OnDestroy {

  @Input() templateInfo: TemplateInfo;

  mode: 'preview' | 'edit' = 'preview';

  nowHover = false;

  @ViewChild('DynamicHost', { read: ViewContainerRef }) host: ViewContainerRef;
  @ViewChild('WrapperContainer') wrapperContainer: ElementRef;

  @ViewChildren(LayoutWrapperComponent) children: QueryList<LayoutWrapperComponent>;

  componentRef: ComponentRef<LayoutBase<TemplateInfo>>;

  @Output() select = new EventEmitter<LayoutWrapperSelectEvent>();

  private _destroy$ = new Subject();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(COMPONENT_SERVICE_TOKEN) private componentFactory: any,
    private _changeDetectorRef: ChangeDetectorRef,
  ) { 
    this._changeDetectorRef.detach();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this._changeDetectorRef.reattach();
    this.loadComponent();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._destroy$.unsubscribe();
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
      instance.mode = this.mode;
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
      takeUntil(this._destroy$),
    ).subscribe((e: LayoutWrapperSelectEvent) => this.select.next(e));
  }

  createLayoutWrapperSelectEvent(templateFieldSelectEvent?: TemplateFieldSelectEvent) {
    const event: LayoutWrapperSelectEvent = {
      selectedTarget: this.wrapperContainer?.nativeElement,
      selectedTargetType: LayoutWrapperSelectedTargetType.TEMPLATE,
      wrapper: this,
      componentRef: this.componentRef,
      templateInfo: this.templateInfo,
      ...(templateFieldSelectEvent || {}),
    };
    return event;
  }

  setMode(mode: 'preview' | 'edit') {
    this.mode = mode;
    if (this.componentRef?.instance) {
      this.componentRef.instance.mode = mode;
    }
  }

  @HostListener('click', ['$event']) click(ev) {
    ev.stopPropagation();
    this.select.next(this.createLayoutWrapperSelectEvent());
  }

  @HostListener('mouseenter') mouseenter() {
    this.nowHover = true;
  }

  @HostListener('mouseleave') mouseleave() {
    this.nowHover = false;
  }

}
