import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { TemplateGetResponse } from './../../../../../global/api/neuxAPI/bean/TemplateGetResponse';
import { AddTemplateButtonComponent } from '../add-template-button/add-template-button.component';
import { TemplateInfo } from './../../../../../global/api/neuxAPI/bean/TemplateInfo';

@Component({
  selector: 'cms-layout-control-panel',
  templateUrl: './layout-control-panel.component.html',
  styleUrls: ['./layout-control-panel.component.scss']
})
export class LayoutControlPanelComponent implements OnInit, OnChanges {

  show = false;

  // 可選版面資料
  @Input() selectableTemplates: TemplateGetResponse;

  mainTemplates: TemplateInfo[] = [];

  @Output() templateAdd = new EventEmitter<string>(); // template_name

  @Input() selectedBtn: AddTemplateButtonComponent;

  constructor() { }

  ngOnInit(): void {
    this.mainTemplates = [
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
      {
        template_id: 'Slide',
        template_name: 'Slide',
        template_thumbnail: 'https://garden.decoder.com.tw/demo_cms/edit_cms?action=getThemePicture&themeId=transglobe-main-052'
      }
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

  selectTemplate(t: TemplateInfo) {
    console.warn('t = ', t);
    const yes = window.confirm(`確定加入${t.template_name}？`);
    if (!yes) { return; }
    const mock = this[`get${t.template_id}`]();
    this.selectedBtn.targetArray.splice(this.selectedBtn.position, 0, mock);
    this.templateAdd.emit(mock.template_id);
  }

  private getTab() {
    return {
      id: '1',
      template_id: 'Tab',
      templateId: 'Tab',
      fields: [],
      attributes: {},
      tabList: [],
    };
  }

  private getIconPage() {
    return {
      id: '2',
      template_id: 'IconPage',
      templateId: 'IconPage',
      fields: [],
      attributes: {},
    };
  }

  private getSlide() {
    return {
      id: '3',
      template_id: 'Slide',
      templateId: 'Slide',
      fields: [],
      attributes: {
        height: '592px'
      }
    };
  }

}
