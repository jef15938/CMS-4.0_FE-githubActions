import { Component, OnInit, Input, Inject, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef, AfterViewInit } from '@angular/core';
import { TemplateInfo } from '../../../interface';
import { COMPONENT_SERVICE_TOKEN } from '../../../injection-token';
import { LayoutBaseComponent } from '../layout-base.component';

@Component({
  selector: 'layout-wrapper',
  templateUrl: './layout-wrapper.component.html',
  styleUrls: ['./layout-wrapper.component.scss']
})
export class LayoutWrapperComponent implements OnInit, AfterViewInit {

  @Input() templateInfo: TemplateInfo;
  @ViewChild('DynamicHost', { read: ViewContainerRef }) host: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(COMPONENT_SERVICE_TOKEN) private componentFactory: any,
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
    const componentRef = this.host.createComponent(componentFactory);
    console.log('load component:', componentRef);
    setTimeout(() => {
      (componentRef as ComponentRef<LayoutBaseComponent<TemplateInfo>>).instance.templateInfo = this.templateInfo;
    });
  }

}
