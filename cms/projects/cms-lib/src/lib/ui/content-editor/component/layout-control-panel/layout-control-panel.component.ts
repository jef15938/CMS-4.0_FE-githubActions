import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContentTemplateInfo } from 'projects/cms-lib/src/lib/neuxAPI/bean/ContentTemplateInfo';
import { TabTemplateInfo, FieldType } from 'layout';

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

  @Input() position = -1;
  @Input() mainTemplates: TemplateInfo[] = [];

  @Output() select = new EventEmitter<{ template: ContentTemplateInfo, position: number }>();

  get show() { return this.position > -1; }

  constructor() { }

  ngOnInit(): void {
    this.mainTemplates = [
      {
        templateId: 'Tab',
        templateName: 'Tab',
        img: 'https://garden.decoder.com.tw/demo_cms/edit_cms?action=getThemePicture&themeId=transglobe-main-052'
      }
    ];
  }

  setPosition(position = -1) {
    this.position = position;
  }

  selectTemplate(t: TemplateInfo) {
    const yes = window.confirm(`確定加入${t.templateName}？`);
    if (!yes) { return; }
    const mock = this._getMock() as any;
    this.select.emit({ template: mock, position: this.position });
  }

  private _getMock() {
    const tabTemplateInfo: TabTemplateInfo = {
      id: '1',
      templateId: 'Tab',
      fieldList: [],
      attributeMap: new Map(),
      tabList: [{
        fieldId: '1-1',
        fieldType: FieldType.GROUP,
        fieldVal: '',
        extensionMap: new Map(),
        tabId: '1-1',
        child: {
          id: '2',
          templateId: 'IconPage',
          fieldList: [],
          attributeMap: new Map(),
          toJson: () => ''
        }
      }, {
        fieldId: '1-2',
        fieldType: FieldType.GROUP,
        fieldVal: '',
        extensionMap: new Map(),
        tabId: '1-2',
        child: {
          id: '3',
          templateId: 'Slide',
          fieldList: [],
          attributeMap: new Map(),
          toJson: () => ''
        }
      }],
      toJson: () => ''
    };

    return tabTemplateInfo;
  }

}
