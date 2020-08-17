import {
  Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges,
  ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef
} from '@angular/core';
import { TemplateGetResponse } from './../../../../../global/api/neuxAPI/bean/TemplateGetResponse';
import { AddTemplateButtonComponent } from '../add-template-button/add-template-button.component';
import { TemplateInfo } from './../../../../../global/api/neuxAPI/bean/TemplateInfo';
import { DynamicComponentFactoryService, LayoutBaseComponent } from '@neux/render';
import { ContentTemplateInfo } from '../../../../../global/api/neuxAPI/bean/ContentTemplateInfo';
import { ContentInfo } from '../../../../../global/api/neuxAPI/bean/ContentInfo';
import { ContentEditorContext } from '../../content-editor.interface';

@Component({
  selector: 'cms-layout-control-panel',
  templateUrl: './layout-control-panel.component.html',
  styleUrls: ['./layout-control-panel.component.scss']
})
export class LayoutControlPanelComponent implements OnInit, OnChanges {

  @ViewChild('CreateTemplateContainer', { read: ViewContainerRef }) createTemplateContainer: ViewContainerRef;

  @Input() context: ContentEditorContext;

  show = false;

  @Input() contentInfo: ContentInfo;

  // 可選版面資料
  @Input() selectableTemplates: TemplateGetResponse;

  mainTemplates: TemplateInfo[] = [];

  @Output() templateAdd = new EventEmitter<string>(); // template_name

  @Input() selectedBtn: AddTemplateButtonComponent;

  constructor(
    private dynamicComponentFactoryService: DynamicComponentFactoryService,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnInit(): void {
    this.mainTemplates = [
      {
        template_id: 'FixedWrapper',
        template_name: '固定式外框',
        template_thumbnail: ''
      },
      // {
      //   template_id: 'Download',
      //   template_name: 'Download',
      //   template_thumbnail: ''
      // },
      // {
      //   template_id: 'News',
      //   template_name: 'News',
      //   template_thumbnail: ''
      // },
      // {
      //   template_id: 'Slide',
      //   template_name: 'Slide',
      //   template_thumbnail: ''
      // },
      // {
      //   template_id: 'HTML',
      //   template_name: 'HTML',
      //   template_thumbnail: ''
      // },
      // {
      //   template_id: 'Tab',
      //   template_name: 'Tab',
      //   template_thumbnail: ''
      // },
      // {
      //   template_id: 'IconPage',
      //   template_name: 'IconPage',
      //   template_thumbnail: ''
      // },
      // {
      //   template_id: 'FieldsDemo',
      //   template_name: 'FieldsDemo',
      //   template_thumbnail: ''
      // },
      // {
      //   template_id: 'GroupDemo',
      //   template_name: 'GroupDemo',
      //   template_thumbnail: ''
      // },
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedBtn) {
      const previous = changes.selectedBtn.previousValue as AddTemplateButtonComponent;
      const current = changes.selectedBtn.currentValue as AddTemplateButtonComponent;
      if (previous) {
        previous.isSelected = false;
      }
      if (current) {
        current.isSelected = true;
      }
      this.show = !!current;
    }
  }

  selectTemplate(selectedTemplateInfo: TemplateInfo) {
    const btnTemplatesContainer = this.selectedBtn.templatesContainer;
    const btnRootTemplatesContainer = this.selectedBtn.rootTemplatesContainer;
    const isRoot = btnTemplatesContainer === btnRootTemplatesContainer;
    const btnLayoutWrapper = this.selectedBtn.targetLayoutWrapper;
    const templateInfo = btnLayoutWrapper?.templateInfo;

    const yes = window.confirm(`確定加入${selectedTemplateInfo.template_name}:${selectedTemplateInfo.template_id}？`);
    if (!yes) { return; }
    const component = this.dynamicComponentFactoryService.getComponent(selectedTemplateInfo.template_id);
    if (!component) { alert(`找不到指定id的版面元件 : ${selectedTemplateInfo.template_id}`); return; }

    let defaultTemplateInfo: ContentTemplateInfo;

    try {
      const viewContainerRef = this.createTemplateContainer;
      viewContainerRef.clear();
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
      const componentRef = viewContainerRef.createComponent(componentFactory) as ComponentRef<LayoutBaseComponent<any>>;
      defaultTemplateInfo = JSON.parse(JSON.stringify(componentRef.instance.defaultTemplateInfo));
      defaultTemplateInfo.id = `${new Date().getTime()}`;
      componentRef.destroy();
      viewContainerRef.clear();
    } catch (error) {

    }

    if (!defaultTemplateInfo) { alert(`找不到指定id版面元件的預設資料 : ${selectedTemplateInfo.template_id}`); return; }

    const rootTemplatesContainers = this.context.getRootTemplatesContainerComponents();

    if (isRoot) {
      rootTemplatesContainers.forEach(rootTemplatesContainer => {
        rootTemplatesContainer.templates.splice(this.selectedBtn.position, 0, JSON.parse(JSON.stringify(defaultTemplateInfo)));
      });
    } else {
      const btnParentLayoutWrapper =
        this.context.findParentLayoutWrapperOfTemplatesContainer(btnTemplatesContainer, btnRootTemplatesContainer);

      if (!btnParentLayoutWrapper) {
        alert('系統異常 : 無 btnLayoutWrapper');
        return;
      }

      const btnLayoutWrapperTemplatesContainerComponents =
        Array.from(btnParentLayoutWrapper.componentRef.instance.templatesContainerComponents || []);

      const templatesContainerIndex = btnLayoutWrapperTemplatesContainerComponents.indexOf(btnTemplatesContainer);

      const allLangTargetTemplatesContainers = rootTemplatesContainers.map(rootTemplatesContainer => {
        if (rootTemplatesContainer === btnRootTemplatesContainer) {
          return btnTemplatesContainer;
        } else {
          const templateInfoId = btnParentLayoutWrapper.templateInfo.id;
          const layoutWrapper = this.context.findLayoutWrapperByTemplateInfoId(templateInfoId, rootTemplatesContainer);
          if (!layoutWrapper) { return null; }
          return Array.from(
            layoutWrapper.componentRef.instance.templatesContainerComponents
          )[templatesContainerIndex];
        }
      });

      if (allLangTargetTemplatesContainers.some(v => !v)) {
        alert('系統異常 : allLangTargetTemplatesContainers 不完全');
        return;
      }

      allLangTargetTemplatesContainers.forEach(target => {
        target.templates.splice(this.selectedBtn.position, 0, JSON.parse(JSON.stringify(defaultTemplateInfo)));
      });
    }

    this.templateAdd.emit(selectedTemplateInfo.template_id);
  }



}
