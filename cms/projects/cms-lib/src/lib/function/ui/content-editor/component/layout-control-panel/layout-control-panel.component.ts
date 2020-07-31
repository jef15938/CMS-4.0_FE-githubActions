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

@Component({
  selector: 'cms-layout-control-panel',
  templateUrl: './layout-control-panel.component.html',
  styleUrls: ['./layout-control-panel.component.scss']
})
export class LayoutControlPanelComponent implements OnInit, OnChanges {

  @ViewChild('CreateTemplateContainer', { read: ViewContainerRef }) createTemplateContainer: ViewContainerRef;

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
        template_id: 'News',
        template_name: 'News',
        template_thumbnail: 'https://garden.decoder.com.tw/demo_cms/edit_cms?action=getThemePicture&themeId=transglobe-main-052'
      },
      {
        template_id: 'Slide',
        template_name: 'Slide',
        template_thumbnail: 'https://garden.decoder.com.tw/demo_cms/edit_cms?action=getThemePicture&themeId=transglobe-main-052'
      },
      {
        template_id: 'Tab',
        template_name: 'Tab',
        template_thumbnail: 'https://garden.decoder.com.tw/demo_cms/edit_cms?action=getThemePicture&themeId=transglobe-main-052'
      },
      {
        template_id: 'IconPage',
        template_name: 'IconPage',
        template_thumbnail: 'https://garden.decoder.com.tw/demo_cms/edit_cms?action=getThemePicture&themeId=transglobe-main-052'
      },
      // {
      //   template_id: 'FieldsDemo',
      //   template_name: 'FieldsDemo',
      //   template_thumbnail: 'https://garden.decoder.com.tw/demo_cms/edit_cms?action=getThemePicture&themeId=transglobe-main-052'
      // },
      // {
      //   template_id: 'GroupDemo',
      //   template_name: 'GroupDemo',
      //   template_thumbnail: 'https://garden.decoder.com.tw/demo_cms/edit_cms?action=getThemePicture&themeId=transglobe-main-052'
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

  selectTemplate(templateInfo: TemplateInfo) {
    const yes = window.confirm(`確定加入${templateInfo.template_name}:${templateInfo.template_id}？`);
    if (!yes) { return; }
    const component = this.dynamicComponentFactoryService.getComponent(templateInfo.template_id);
    if (!component) { alert(`找不到指定id的版面元件 : ${templateInfo.template_id}`); return; }

    let defaultTemplateInfo: ContentTemplateInfo;

    try {
      const viewContainerRef = this.createTemplateContainer;
      viewContainerRef.clear();
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
      const componentRef = viewContainerRef.createComponent(componentFactory) as ComponentRef<LayoutBaseComponent<any>>;
      defaultTemplateInfo = componentRef.instance.defaultTemplateInfo;
      componentRef.destroy();
      viewContainerRef.clear();
    } catch (error) {

    }

    if (!defaultTemplateInfo) { alert(`找不到指定id版面元件的預設資料 : ${templateInfo.template_id}`); return; }
    // this.selectedBtn.targetArray.splice(this.selectedBtn.position, 0, defaultTemplateInfo);
    this.contentInfo?.languages?.forEach(language => {
      language.templates.splice(this.selectedBtn.position, 0, defaultTemplateInfo);
    });
    this.templateAdd.emit(templateInfo.template_id);
  }

}
