import {
  Component, OnInit, Input, ViewChild,
  ComponentRef, AfterViewInit, EventEmitter, Output, QueryList,
  HostListener, OnChanges, SimpleChanges, Injector, PLATFORM_ID, SimpleChange
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
import { SiteInfoModel } from '../../../global/api/data-model/models/site-info.model';

@Component({
  selector: 'rdr-layout-wrapper',
  templateUrl: './layout-wrapper.component.html',
  styleUrls: ['./layout-wrapper.component.scss']
})
export class LayoutWrapperComponent extends LayoutWrapperBase implements
  LayoutWrapper, OnInit, AfterViewInit, OnChanges {

  @Input() templateInfo: ContentTemplateInfoModel;

  @ViewChild('dynamic') dynamicWrapperComponent: DynamicWrapperComponent<LayoutBase<ContentTemplateInfoModel>>;

  @Input() parentTemplatesContainer: {
    mode: 'preview' | 'edit', templates: ContentTemplateInfoModel[]; sites: SiteInfoModel[]
  };

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

  ngOnChanges(changes: SimpleChanges): void {
    // console.warn('ngOnChanges()', { this: this, changes });
    this.setInstanceData(this.componentRef?.instance);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    if (!this.canRender(this.templateInfo.templateId)) { return; }
    this.changeDetectorRef.reattach();
    this.changeDetectorRef.detectChanges();
    const templateId = this.templateInfo.templateId;
    // FIXME 不應該在這裏呼叫 this.dynamicWrapperComponent.loadWithComponent(component); ?
    try {
      const component = this.dynamicComponentFactoryService.getComponent(templateId);
      this.dynamicWrapperComponent.loadWithComponent(component);
      this.checkEventBinding();
    } catch (error) {
      console.error('LayoutWrapperComponent loadWithComponent error: templateId = ', templateId);
      throw error;
    }
  }

  setInstanceProperties = (componentRef: ComponentRef<LayoutBase<ContentTemplateInfoModel>>): void => {
    this.setInstanceData(componentRef?.instance);
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

  setInstanceData(instance: LayoutBase<ContentTemplateInfoModel>, force = false) {
    if (!instance) { return; }
    instance.parentLayoutWrapper = this;

    const oldData = {
      mode: instance.mode,
      sites: instance.sites,
      pageInfo: instance.pageInfo,
      templateInfo: instance.templateInfo,
      fixed: instance.fixed,
    };

    const newData = {
      mode: this.mode,
      sites: this.sites,
      pageInfo: this.pageInfo,
      templateInfo: this.templateInfo,
      fixed: this.templateInfo?.templateId === 'FixedWrapper',
    };

    const newDataKeys = Object.keys(newData);

    const hasChange = newDataKeys.some(k => newData[k] !== oldData[k]);

    // console.warn({ this: this, instance, oldData, newData, hasChange, newDataKeys, force });
    if (!hasChange && !force) { return; }

    newDataKeys.forEach(k => instance[k] = newData[k]);

    const simpleChanges = newDataKeys.map(k => {
      return { k, v: new SimpleChange(oldData[k], newData[k], false) };
    }).reduce((r, e) => {
      r[e.k] = e.v;
      return r;
    }, {}) as SimpleChanges;

    // console.warn('simpleChanges = ', simpleChanges);

    if (instance.ngOnChanges && typeof (instance.ngOnChanges) === 'function') {
      instance.ngOnChanges(simpleChanges);
    }

    const templatesContainerComponents = Array.from(instance.templatesContainerComponents || []);
    const templateFieldDirectives = Array.from(instance.templateFieldDirectives || []);

    // console.warn({ templatesContainerComponents, templateFieldDirectives });

    [...templatesContainerComponents, ...templateFieldDirectives].forEach(comp => {
      comp.mode = newData.mode;
      comp.sites = newData.sites;
      comp.pageInfo = newData.pageInfo;
      comp.fixed = newData.fixed;

      const compAny = comp as any;
      if (compAny.ngOnChanges && typeof (compAny.ngOnChanges) === 'function') {
        compAny.ngOnChanges(simpleChanges);
      }
    });
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
