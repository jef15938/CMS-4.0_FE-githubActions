import { OnInit, Input, AfterViewInit, ViewChildren, QueryList, Injector, OnDestroy } from '@angular/core';
import { TemplateInfo } from '../../interface/template-info.interface';
import { LayoutBase } from './_base.interface';
import { LayoutWrapperComponent } from '../layout-wrapper/layout-wrapper.component';
import { TemplateFieldDirective } from '../layout-wrapper/template-field.directive';
import { TemplateType } from '../layout-wrapper/layout-wrapper.interface';
import { TemplatesContainerComponent } from '../templates-container/templates-container.component';
import { FieldType } from '../../interface/field-info.interface';
import { takeUntil } from 'rxjs/operators';
import { Subject, merge } from 'rxjs';

export abstract class LayoutBaseComponent<TInfo extends TemplateInfo> implements LayoutBase<TInfo>, OnInit, AfterViewInit, OnDestroy {

  abstract templateType: TemplateType;

  readonly FieldType = FieldType;
  readonly TemplateType = TemplateType;

  parentLayoutWrapper: LayoutWrapperComponent;
  @ViewChildren(TemplatesContainerComponent) templatesContainerComponents: QueryList<TemplatesContainerComponent>;
  @ViewChildren(TemplateFieldDirective) templateFieldDirectives: QueryList<TemplateFieldDirective>;

  private _templateInfo: TInfo;
  private _isViewInit: boolean = false;

  get isViewInit() {
    return this._isViewInit;
  }

  @Input() mode: 'preview' | 'edit' = 'preview';

  @Input()
  public get templateInfo(): TInfo {
    return this._templateInfo;
  }
  public set templateInfo(value: TInfo) {
    this._templateInfo = value;
    console.log('set templateInfo:', value);
  }

  protected destroy$ = new Subject();

  constructor(
    protected injector: Injector,
  ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this._isViewInit = true;
    merge(
      this.templatesContainerComponents.changes,
      this.templateFieldDirectives.changes,
    ).pipe(takeUntil(this.destroy$)).subscribe(_ => {
      this.parentLayoutWrapper.checkEventBinding();
      this.parentLayoutWrapper.setMode();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }

}
