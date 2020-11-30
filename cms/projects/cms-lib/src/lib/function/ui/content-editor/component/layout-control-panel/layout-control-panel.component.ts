import {
  Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges,
  ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef
} from '@angular/core';
import { AddTemplateButtonComponent } from '../add-template-button/add-template-button.component';
import { DynamicComponentFactoryService, TemplateBaseComponent, TemplatesContainerComponent } from '@neux/render';
import { ContentEditorContext } from '../../content-editor.interface';
import { TemplateGetResponseModel } from '../../../../../global/api/data-model/models/template-get-response.model';
import { TemplateInfoModel } from '../../../../../global/api/data-model/models/template-info.model';
import { ContentInfoModel } from '../../../../../global/api/data-model/models/content-info.model';
import { ContentTemplateInfoModel } from '../../../../../global/api/data-model/models/content-template-info.model';
import { ModalService } from '../../../modal';
import { CmsErrorHandler } from '../../../../../global/error-handling';


const DEMO_TEMPLATES = [
  {
    templateId: 'social-media',
    templateName: '社交媒體分享',
    templateThumbnail: ''
  },
  {
    templateId: 'banner',
    templateName: 'Banner',
    templateThumbnail: ''
  },
  {
    templateId: 'list',
    templateName: '清單',
    templateThumbnail: ''
  },
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
  // }
];
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

  mainTemplates: TemplateInfoModel[] = [...DEMO_TEMPLATES];

  @Output() templateAdd = new EventEmitter<string>(); // template_name

  @Input() selectedBtn: AddTemplateButtonComponent;

  constructor(
    private dynamicComponentFactoryService: DynamicComponentFactoryService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private modalService: ModalService,
  ) { }

  ngOnInit(): void {
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
        this.getWhiteList();
      }
      this.show = !!current;
    }
  }


  /**
   * 從templatesContainer取得白名單,並過濾掉可選版型
   *
   * @return {*}
   * @memberof LayoutControlPanelComponent
   */
  getWhiteList() {
    const flatternArr = [...this.selectableTemplates.static, ...this.selectableTemplates.tab
      , ...this.selectableTemplates.dynamic, ...this.selectableTemplates.customize, ...this.mainTemplates];
    if (this.selectedBtn.templatesContainer.whiteList.length) {
      flatternArr.forEach(e => e.show = !!this.selectedBtn.templatesContainer.whiteList.find(q => q === e.templateId));
    }
    else { flatternArr.forEach(e => e.show = true); }
  }

  selectTemplate(selectedTemplateInfo: TemplateInfoModel) {
    const btnTemplatesContainer = this.selectedBtn.templatesContainer;
    const btnRootTemplatesContainer = this.selectedBtn.rootTemplatesContainer;
    const isRoot = btnTemplatesContainer === btnRootTemplatesContainer;
    const btnTemplateWrapper = this.selectedBtn.targetTemplateWrapper;
    const templateInfo = btnTemplateWrapper?.templateInfo;

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
      const componentRef = viewContainerRef.createComponent(componentFactory) as ComponentRef<TemplateBaseComponent<any>>;

      const componentInctanceDefaultTemplateInfo = componentRef.instance.defaultTemplateInfo;
      if (!componentInctanceDefaultTemplateInfo) {
        throw new Error(`版型元件 ${componentRef.instance.TEMPLATE_ID} 沒有預設資料`);
      }

      defaultTemplateInfo = JSON.parse(JSON.stringify(componentInctanceDefaultTemplateInfo));
      defaultTemplateInfo.id = `${new Date().getTime()}`;
      componentRef.destroy();
      viewContainerRef.clear();
    } catch (error) {
      CmsErrorHandler.throwAndShow(error, 'LayoutControlPanelComponent.selectTemplate()', '處理選擇版面預設資料錯誤');
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
        const btnParentTemplateWrapper =
          this.context.findParentTemplateWrapperOfTemplatesContainer(btnTemplatesContainer, btnRootTemplatesContainer);

        if (!btnParentTemplateWrapper) {
          this.modalService.openMessage({ message: '系統異常 : 無 btnTemplateWrapper' }).subscribe();
          return;
        }

        const btnTemplateWrapperTemplatesContainerComponents =
          Array.from(btnParentTemplateWrapper.componentRef.instance.templatesContainerComponents || []);

        const templatesContainerIndex = btnTemplateWrapperTemplatesContainerComponents.indexOf(btnTemplatesContainer);

        const allLangTargetTemplatesContainers =
          rootTemplatesContainersOfBlocksByLanguage.map(rootTemplatesContainersOfBlocks => {
            return rootTemplatesContainersOfBlocks.map(rootTemplatesContainer => {
              if (
                rootTemplatesContainer === btnRootTemplatesContainer
                && !rootTemplatesContainer.templates.some(t => t.templateId === 'FixedWrapper')
              ) {
                return btnTemplatesContainer;
              } else {
                const templateInfoId = btnParentTemplateWrapper.templateInfo.id;
                const templateWrapper = this.context.findTemplateWrapperByTemplateInfoId(templateInfoId, rootTemplatesContainer);
                if (!templateWrapper) { return null; }
                return Array.from(
                  templateWrapper.componentRef.instance.templatesContainerComponents
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
