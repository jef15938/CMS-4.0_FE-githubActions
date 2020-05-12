import { Component, OnInit, Input, Inject, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef, AfterViewInit, EventEmitter, Output, ChangeDetectorRef, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { TemplateInfo } from '../../../interface';
import { COMPONENT_SERVICE_TOKEN } from '../../../injection-token';
import { LayoutBase } from '../layout-base.interface';
import { tap, takeUntil } from 'rxjs/operators'
import { merge, Subject } from 'rxjs';
import { LayoutWrapperEvent, LayoutWrapper } from './layout-wrapper.interface';

@Component({
  selector: 'layout-wrapper',
  templateUrl: './layout-wrapper.component.html',
  styleUrls: ['./layout-wrapper.component.scss']
})
export class LayoutWrapperComponent implements LayoutWrapper, OnInit, AfterViewInit {

  @Input() templateInfo: TemplateInfo;
  @ViewChild('DynamicHost', { read: ViewContainerRef }) host: ViewContainerRef;
  @ViewChild('WrapperContainer') containerDiv: ElementRef;

  @ViewChildren(LayoutWrapperComponent) children: QueryList<LayoutWrapperComponent>;

  componentRef: ComponentRef<LayoutBase<TemplateInfo>>;

  @Output() mouseEnter = new EventEmitter<LayoutWrapperEvent>();
  @Output() mouseLeave = new EventEmitter<LayoutWrapperEvent>();
  @Output() select = new EventEmitter<LayoutWrapperEvent>();

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

  loadComponent() {
    const componentClass = this.componentFactory.getComponent(this.templateInfo.templateId);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    this.host.clear();
    const componentRef = this.host.createComponent(componentFactory) as ComponentRef<LayoutBase<TemplateInfo>>;
    // console.log('load component:', componentRef);
    componentRef.instance.templateInfo = this.templateInfo;
    this.componentRef = componentRef;

    this._changeDetectorRef.detectChanges();

    if (this.componentRef.instance.childLayoutWrappers) {
      const childLayoutWrappers = this.componentRef.instance.childLayoutWrappers as QueryList<LayoutWrapperComponent>;
      merge(...[
        merge(...childLayoutWrappers.map(c => c.mouseEnter).filter(l => !!l)).pipe(tap(e => this.mouseEnter.next(e as LayoutWrapperEvent))),
        merge(...childLayoutWrappers.map(c => c.mouseLeave).filter(l => !!l)).pipe(tap(e => this.mouseLeave.next(e as LayoutWrapperEvent))),
        merge(...childLayoutWrappers.map(c => c.select).filter(l => !!l)).pipe(tap(e => this.select.next(e as LayoutWrapperEvent))),
      ]).pipe(takeUntil(this._destroy$)).subscribe();
    }

  }

  getEvent(): LayoutWrapperEvent {
    return {
      wrapper: this as any,
      componentRef: this.componentRef,
      templateInfo: this.templateInfo,
    }
  }

}
