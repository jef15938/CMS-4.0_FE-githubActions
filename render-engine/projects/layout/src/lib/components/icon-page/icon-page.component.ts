import { Component, OnInit, ComponentFactoryResolver, Inject, ChangeDetectorRef } from '@angular/core';
import { TemplateInfo } from '../../interface/template-info.interface';
import { LayoutBaseComponent } from '../../wrapper/layout-base/layout-base.component';
import { COMPONENT_SERVICE_TOKEN } from '../../injection-token';
import { TemplateType } from '../../wrapper/layout-wrapper/layout-wrapper.interface';

@Component({
  selector: 'app-icon-page',
  templateUrl: './icon-page.component.html',
  styleUrls: ['./icon-page.component.scss']
})
export class IconPageComponent extends LayoutBaseComponent<TemplateInfo> implements OnInit {
  templateType = TemplateType.COMMON;

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    @Inject(COMPONENT_SERVICE_TOKEN) componentFactory: any,
    changeDetector: ChangeDetectorRef
  ) {
    super(componentFactory, componentFactoryResolver, changeDetector);
  }

  ngOnInit() {
  }

}
