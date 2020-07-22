import {
  Component, OnInit, Input, ViewChild,
  ComponentRef, AfterViewInit, EventEmitter, Output, QueryList,
  HostListener, OnChanges, SimpleChanges, Injector, PLATFORM_ID
} from '@angular/core';
import { ContentTemplateInfo } from '../../../global/interface';
import { LayoutBase } from '../layout-base/_base.interface';
import { takeUntil, map, tap } from 'rxjs/operators';
import { merge, Subscription } from 'rxjs';
import { LayoutWrapperSelectEvent, LayoutWrapper, TemplateFieldSelectEvent, LayoutWrapperSelectedTargetType } from './layout-wrapper.interface';
import { LayoutWrapperBase } from './layout-wrapper-base';
import { DynamicWrapperComponent } from '@neux/core';
import { DynamicComponentFactoryService } from '../../../global/service/dynamic-component-factory.service';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'rdr-layout-wrapper',
  templateUrl: './layout-wrapper.component.html',
  styleUrls: ['./layout-wrapper.component.scss']
})
export class LayoutWrapperComponent extends LayoutWrapperBase implements
  LayoutWrapper, OnInit, AfterViewInit, OnChanges {

  @Input() templateInfo: ContentTemplateInfo;
  @Input() mode: 'preview' | 'edit' = 'edit';

  @ViewChild('dynamic') dynamicWrapperComponent: DynamicWrapperComponent<LayoutBase<ContentTemplateInfo>>;

  parentTemplatesContainer: { templates: ContentTemplateInfo[]; };

  get componentRef() { return this.dynamicWrapperComponent?.componentRef; }

  // tslint:disable-next-line: no-output-native
  @Output() select = new EventEmitter<LayoutWrapperSelectEvent>();

  private instanceEventSubscription: Subscription;

  private platformId = '';

  constructor(
    private dynamicComponentFactoryService: DynamicComponentFactoryService,
    injector: Injector,
  ) {
    super(injector);
    this.platformId = this.injector.get<string>(PLATFORM_ID);
    this.changeDetectorRef.detach();
  }

  ngOnInit(): void {

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
    if (!this.canRender(this.templateInfo.templateId)) { return; }
    this.changeDetectorRef.reattach();
    this.changeDetectorRef.detectChanges();
    const component = this.dynamicComponentFactoryService.getComponent(this.templateInfo.templateId);
    this.dynamicWrapperComponent.loadWithComponent(component);
    this.checkEventBinding();
    this.setMode();
  }

  setInstanceProperties = (componentRef: ComponentRef<LayoutBase<ContentTemplateInfo>>): void => {
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

  private registerInstanceEvents(instance: LayoutBase<ContentTemplateInfo>) {
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

  canRender(componentId: string): boolean {
    const appShellNoRenderComponentIds = this.dynamicComponentFactoryService.getAppShellNoRenderComponentIds();
    const appShellNoRender = appShellNoRenderComponentIds.indexOf(componentId) > -1;
    const canRender = !(isPlatformServer(this.platformId) && appShellNoRender);
    return canRender;
  }

}
