import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AddTemplateButtonComponent } from '../add-template-button/add-template-button.component';

class TemplateInfo {
  templateId: string;
  templateName: string;
  img: string;
}

@Component({
  selector: 'cms-layout-control-panel',
  templateUrl: './layout-control-panel.component.html',
  styleUrls: ['./layout-control-panel.component.scss']
})
export class LayoutControlPanelComponent implements OnInit {

  get show() { return !!this.selectedBtn }

  @Input() mainTemplates: TemplateInfo[] = [];

  @Output() templateAdd = new EventEmitter<string>(); // templateName

  selectedBtn: AddTemplateButtonComponent;

  constructor() { }

  ngOnInit(): void {
    this.mainTemplates = [
      {
        templateId: 'Tab',
        templateName: 'Tab',
        img: 'https://garden.decoder.com.tw/demo_cms/edit_cms?action=getThemePicture&themeId=transglobe-main-052'
      },
      {
        templateId: 'IconPage',
        templateName: 'IconPage',
        img: 'https://garden.decoder.com.tw/demo_cms/edit_cms?action=getThemePicture&themeId=transglobe-main-052'
      },
      {
        templateId: 'Slide',
        templateName: 'Slide',
        img: 'https://garden.decoder.com.tw/demo_cms/edit_cms?action=getThemePicture&themeId=transglobe-main-052'
      }
    ];
  }

  setSelected(newSelected?: AddTemplateButtonComponent) {
    const oldSelected = this.selectedBtn;
    if (oldSelected) { oldSelected.isSelected = false; }
    if (newSelected) { newSelected.isSelected = true; }
    this.selectedBtn = newSelected;
  }

  selectTemplate(t: TemplateInfo) {
    const yes = window.confirm(`確定加入${t.templateName}？`);
    if (!yes) { return; }
    const mock = this[`_get${t.templateId}`]();
    this.selectedBtn.targetArray.splice(this.selectedBtn.position, 0, mock);
    this.templateAdd.emit(mock.templateId);
  }

  private _getTab() {
    return {
      id: '1',
      templateId: 'Tab',
      fields: [],
      attributes: {},
      tabList: [],
      toJson: () => ''
    };
  }

  private _getIconPage() {
    return {
      id: '2',
      templateId: 'IconPage',
      fields: [],
      attributes: {},
      toJson: () => ''
    };
  }

  private _getSlide() {
    return {
      id: '3',
      templateId: 'Slide',
      fields: [],
      attributes: {
        height: '300px'
      },
      toJson: () => ''
    }
  }

}
