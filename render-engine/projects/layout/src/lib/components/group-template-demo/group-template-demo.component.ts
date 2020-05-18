import { Component, OnInit, ComponentFactoryResolver, Inject, ChangeDetectorRef } from '@angular/core';
import { LayoutBaseComponent } from '../../wrapper/layout-base/layout-base.component';
import { GroupTemplateInfo } from '../../interface/group-template-info.interface';
import { TemplateType } from '../../wrapper/layout-wrapper/layout-wrapper.interface';
import { COMPONENT_SERVICE_TOKEN } from '../../injection-token';

@Component({
  selector: 'lib-group-template-demo',
  templateUrl: './group-template-demo.component.html',
  styleUrls: ['./group-template-demo.component.scss']
})
export class GroupTemplateDemoComponent extends LayoutBaseComponent<GroupTemplateInfo>  implements OnInit {
  templateType: TemplateType.GROUP;

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    @Inject(COMPONENT_SERVICE_TOKEN) componentFactory: any,
    changeDetector: ChangeDetectorRef
  ) { 
    super(componentFactory, componentFactoryResolver, changeDetector);
  }

  ngOnInit(): void {
  }

}
