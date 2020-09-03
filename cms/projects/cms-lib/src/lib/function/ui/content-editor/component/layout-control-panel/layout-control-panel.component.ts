import {
  Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges,
  ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef
} from '@angular/core';
import { AddTemplateButtonComponent } from '../add-template-button/add-template-button.component';
import { DynamicComponentFactoryService, LayoutBaseComponent, TemplatesContainerComponent } from '@neux/render';
import { ContentEditorContext } from '../../content-editor.interface';
import { TemplateGetResponseModel } from '../../../../../global/api/data-model/models/template-get-response.model';
import { TemplateInfoModel } from '../../../../../global/api/data-model/models/template-info.model';
import { ContentInfoModel } from '../../../../../global/api/data-model/models/content-info.model';
import { ContentTemplateInfoModel } from '../../../../../global/api/data-model/models/content-template-info.model';
import { ModalService } from '../../../modal';
import { CmsErrorHandler } from '../../../../../global/error-handling';

@Component({
  selector: 'cms-layout-control-panel',
  templateUrl: './layout-control-panel.component.html',
  styleUrls: ['./layout-control-panel.component.scss']
})
export class LayoutControlPanelComponent implements OnInit, OnChanges {

  @ViewChild('CreateTemplateContainer', { read: ViewContainerRef }) createTemplateContainer: ViewContainerRef;

  @Input() context: ContentEditorContext;

  show = false;

  @Input() contentInfo: ContentInfoModel;

  // 可選版面資料
  @Input() selectableTemplates: TemplateGetResponseModel;

  mainTemplates: TemplateInfoModel[] = [];

  @Output() templateAdd = new EventEmitter<string>(); // template_name

  @Input() selectedBtn: AddTemplateButtonComponent;

  constructor(
    private dynamicComponentFactoryService: DynamicComponentFactoryService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private modalService: ModalService,
  ) { }

  ngOnInit(): void {
    this.mainTemplates = [
      {
        templateId: 'FixedWrapper',
        templateName: '固定式外框',
        templateThumbnail: ''
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

  selectTemplate(selectedTemplateInfo: TemplateInfoModel) {
    const btnTemplatesContainer = this.selectedBtn.templatesContainer;
    const btnRootTemplatesContainer = this.selectedBtn.rootTemplatesContainer;
    const isRoot = btnTemplatesContainer === btnRootTemplatesContainer;
    const btnLayoutWrapper = this.selectedBtn.targetLayoutWrapper;
    const templateInfo = btnLayoutWrapper?.templateInfo;

    const yes = window.confirm(`確定加入${selectedTemplateInfo.templateName}:${selectedTemplateInfo.templateId}？`);
    if (!yes) { return; }
    const component = this.dynamicComponentFactoryService.getComponent(selectedTemplateInfo.templateId);
    if (!component) {
      this.modalService.openMessage({ message: `找不到指定id的版面元件 : ${selectedTemplateInfo.templateId}` }).subscribe();
      return;
    }

    let defaultTemplateInfo: ContentTemplateInfoModel;

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
      CmsErrorHandler.throwAndShow(error, 'LayoutControlPanelComponent.selectTemplate()', '處理選擇版面預設資料錯誤錯誤');
    }

    if (!defaultTemplateInfo) {
      this.modalService.openMessage({ message: `找不到指定id版面元件的預設資料 : ${selectedTemplateInfo.templateId}` }).subscribe();
      return;
    }

    const rootTemplatesContainersOfBlocksByLanguage = this.context.getRootTemplatesContainersOfBlocksByLanguage();

    try {
      if (isRoot) {
        rootTemplatesContainersOfBlocksByLanguage.forEach(rootTemplatesContainersOfBlocks => {
          rootTemplatesContainersOfBlocks.forEach(rootTemplatesContainer => {
            rootTemplatesContainer.templates.splice(this.selectedBtn.position, 0, JSON.parse(JSON.stringify(defaultTemplateInfo)));
          });
        });
      } else {
        const btnParentLayoutWrapper =
          this.context.findParentLayoutWrapperOfTemplatesContainer(btnTemplatesContainer, btnRootTemplatesContainer);

        if (!btnParentLayoutWrapper) {
          this.modalService.openMessage({ message: '系統異常 : 無 btnLayoutWrapper' }).subscribe();
          return;
        }

        const btnLayoutWrapperTemplatesContainerComponents =
          Array.from(btnParentLayoutWrapper.componentRef.instance.templatesContainerComponents || []);

        const templatesContainerIndex = btnLayoutWrapperTemplatesContainerComponents.indexOf(btnTemplatesContainer);

        const allLangTargetTemplatesContainers =
          rootTemplatesContainersOfBlocksByLanguage.map(rootTemplatesContainersOfBlocks => {
            return rootTemplatesContainersOfBlocks.map(rootTemplatesContainer => {
              if (
                rootTemplatesContainer === btnRootTemplatesContainer
                && !rootTemplatesContainer.templates.some(t => t.templateId === 'FixedWrapper')
              ) {
                return btnTemplatesContainer;
              } else {
                const templateInfoId = btnParentLayoutWrapper.templateInfo.id;
                const layoutWrapper = this.context.findLayoutWrapperByTemplateInfoId(templateInfoId, rootTemplatesContainer);
                if (!layoutWrapper) { return null; }
                return Array.from(
                  layoutWrapper.componentRef.instance.templatesContainerComponents
                )[templatesContainerIndex];
              }
            }).filter(v => !!v);
          }).reduce((a, b) => a.concat(b), [] as TemplatesContainerComponent[]);

        if (allLangTargetTemplatesContainers.some(v => !v)) {
          this.modalService.openMessage({ message: '程式錯誤，尋找版面資料錯誤' }).subscribe();
          return;
        }

        allLangTargetTemplatesContainers.forEach(target => {
          target.templates.splice(this.selectedBtn.position, 0, JSON.parse(JSON.stringify(defaultTemplateInfo)));
        });
      }
    } catch (error) {
      CmsErrorHandler.throwAndShow(error, 'LayoutControlPanelComponent.selectTemplate()', '處理加入版面資料錯誤');
    }

    this.templateAdd.emit(selectedTemplateInfo.templateName);
  }



}
