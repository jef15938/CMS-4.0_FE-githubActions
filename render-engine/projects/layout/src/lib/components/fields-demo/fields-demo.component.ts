import { Component, OnInit, ComponentFactoryResolver, Inject, ChangeDetectorRef } from '@angular/core';
import { LayoutBaseComponent } from '../layout-base/layout-base.component';
import { TemplateInfo } from '../../interface/template-info.interface';
import { COMPONENT_SERVICE_TOKEN } from '../../injection-token';

@Component({
  selector: 'lib-fields-demo',
  templateUrl: './fields-demo.component.html',
  styleUrls: ['./fields-demo.component.css']
})
export class FieldsDemoComponent extends LayoutBaseComponent<TemplateInfo> implements OnInit {
  
  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    @Inject(COMPONENT_SERVICE_TOKEN) componentFactory: any,
    changeDetector: ChangeDetectorRef
  ) { 
    super(componentFactory, componentFactoryResolver, changeDetector);
  }

  ngOnInit(): void {
  }

  renderComponent(): void {
    throw new Error("Method not implemented.");
  }

}
