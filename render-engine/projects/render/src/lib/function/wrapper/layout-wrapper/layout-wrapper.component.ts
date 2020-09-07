import {
  Component, OnInit, Input, ViewChild,
  ComponentRef, AfterViewInit, EventEmitter, Output, QueryList,
  HostListener, OnChanges, SimpleChanges, Injector, PLATFORM_ID, AfterContentChecked
} from '@angular/core';
import { LayoutBase } from '../layout-base/layout-base.interface';
import { takeUntil, map, tap } from 'rxjs/operators';
import { merge, Subscription } from 'rxjs';
import { LayoutWrapperSelectEvent, LayoutWrapper, TemplateFieldSelectEvent, LayoutWrapperSelectedTargetType } from './layout-wrapper.interface';
import { LayoutWrapperBase } from './layout-wrapper-base';
import { DynamicWrapperComponent } from '@neux/core';
import { DynamicComponentFactoryService } from '../../../global/service/dynamic-component-factory.service';
import { isPlatformServer } from '@angular/common';
import { ContentTemplateInfoModel } from '../../../global/api/data-model/models/content-template-info.model';

@Component({
  selector: 'rdr-layout-wrapper',
  templateUrl: './layout-wrapper.component.html',
  styleUrls: ['./layout-wrapper.component.scss']
})
export class LayoutWrapperComponent extends LayoutWrapperBase implements
  LayoutWrapper, OnInit, AfterViewInit, AfterContentChecked, OnChanges {

  @Input() templateInfo: ContentTemplateInfoModel;
  @Input() runtime = false;
  @Input() mode: 'preview' | 'edit' = 'edit';

  @ViewChild('dynamic') dynamicWrapperComponent: DynamicWrapperComponent<LayoutBase<ContentTemplateInfoModel>>;

  @Input() parentTemplatesContainer: { templates: ContentTemplateInfoModel[]; runtime: boolean };

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
  ngAfterContentChecked(): void {
    this.setMode();
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
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
  }

  setInstanceProperties = (componentRef: ComponentRef<LayoutBase<ContentTemplateInfoModel>>): void => {
    const instance = componentRef?.instance;
    if (instance) {
      instance.templateInfo = this.templateInfo;
      instance.mode = this.mode;
      instance.runtime = this.runtime;
      instance.parentLayoutWrapper = this;
    }
  }

  checkEventBinding() {
    if (this.instanceEventSubscription) { this.instanceEventSubscription.unsubscribe(); }
    this.instanceEventSubscription =
      this.registerInstanceEvents(this.componentRef?.instance).pipe(takeUntil(this.destroy$)).subscribe();
  }

  private registerInstanceEvents(instance: LayoutBase<ContentTemplateInfoModel>) {
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
    this.runtime = this.parentTemplatesContainer?.runtime || false;
    const mode = this.mode || 'preview';
    const runtime = this.runtime || false;
    const instance = this.componentRef?.instance;
    if (instance) {
      instance.mode = mode;
      instance.runtime = runtime;
      const templatesContainerComponents = instance?.templatesContainerComponents || new QueryList();
      templatesContainerComponents.forEach(c => {
        c.mode = mode;
        c.runtime = runtime;
      });
      const templateFieldDirectives = instance?.templateFieldDirectives || new QueryList();
      templateFieldDirectives.forEach(d => {
        d.mode = mode;
        d.runtime = runtime;
      });
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
