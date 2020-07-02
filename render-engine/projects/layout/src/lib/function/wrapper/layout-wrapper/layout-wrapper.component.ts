import {
  Component, OnInit, Input, Inject, ViewChild,
  ComponentRef, AfterViewInit, EventEmitter, Output, QueryList,
  HostListener, OnChanges, SimpleChanges, Injector
} from '@angular/core';
import { TemplateInfo } from '../../../global/interface';
import { COMPONENT_SERVICE_TOKEN } from '../../../global/injection-token/injection-token';
import { LayoutBase } from '../layout-base/_base.interface';
import { takeUntil, map, tap } from 'rxjs/operators';
import { merge, Subscription } from 'rxjs';
import { LayoutWrapperSelectEvent, LayoutWrapper, TemplateFieldSelectEvent, LayoutWrapperSelectedTargetType } from './layout-wrapper.interface';
import { LayoutWrapperBase } from './layout-wrapper-base';
import { DynamicWrapperComponent } from '../../dynamic-wrapper/component/dynamic-wrapper/dynamic-wrapper.component';

@Component({
  selector: 'layoutlib-layout-wrapper',
  templateUrl: './layout-wrapper.component.html',
  styleUrls: ['./layout-wrapper.component.scss']
})
export class LayoutWrapperComponent extends LayoutWrapperBase implements
  LayoutWrapper, OnInit, AfterViewInit, OnChanges {

  @Input() templateInfo: TemplateInfo;
  @Input() mode: 'preview' | 'edit' = 'edit';

  @ViewChild('dynamic') dynamicWrapperComponent: DynamicWrapperComponent<LayoutBase<TemplateInfo>>;

  parentTemplatesContainer: { templates: TemplateInfo[]; };

  componentClass: any;

  get componentRef() { return this.dynamicWrapperComponent?.componentRef; }


  // tslint:disable-next-line: no-output-native
  @Output() select = new EventEmitter<LayoutWrapperSelectEvent>();

  private instanceEventSubscription: Subscription;

  constructor(
    @Inject(COMPONENT_SERVICE_TOKEN) private componentFactory: any,
    injector: Injector,
  ) {
    super(injector);
    this.changeDetectorRef.detach();
  }

  ngOnInit(): void {
    this.componentClass = this.componentFactory.getComponent(this.templateInfo.templateId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.mode) {
      this.setMode();
    }
    if (changes.templateInfo && this.componentRef?.instance) {
      this.componentRef.instance.templateInfo = this.templateInfo;
      if (this.componentRef?.instance?.ngOnChanges) {
        this.componentRef.instance.ngOnChanges(changes);
      }
    }
  }

  ngAfterViewInit() {
    this.changeDetectorRef.reattach();
    this.changeDetectorRef.detectChanges();
    this.dynamicWrapperComponent.loadComponent();
    this.checkEventBinding();
    this.setMode();
  }

  setInstanceProperties = (componentRef: ComponentRef<LayoutBase<TemplateInfo>>): void => {
    const instance = componentRef?.instance;
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
    );
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
