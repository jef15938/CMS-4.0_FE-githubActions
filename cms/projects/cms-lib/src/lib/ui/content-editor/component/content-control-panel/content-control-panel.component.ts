import { Component, OnInit } from '@angular/core';
import { LayoutWrapperSelectEvent, FieldType, LayoutWrapperSelectedTargetType } from 'layout';
import { ContentTemplateInfo } from 'projects/cms-lib/src/lib/neuxAPI/bean/ContentTemplateInfo';

enum TemplateInfoType {
  COMMON = 'TemplateInfo',
  TAB = 'TabTemplateInfo',
  DATA_SOURCE = 'DataSourceTemplateInfo',
  GROUP = 'GroupTemplateInfo',
  CUSTOMIZE = 'CustomizeTemplateInfo',
}

@Component({
  selector: 'cms-content-control-panel',
  templateUrl: './content-control-panel.component.html',
  styleUrls: ['./content-control-panel.component.scss']
})
export class ContentControlPanelComponent implements OnInit {

  TemplateInfoType = TemplateInfoType;

  LayoutWrapperSelectedTargetType = LayoutWrapperSelectedTargetType;
  FieldType = FieldType;

  content: LayoutWrapperSelectEvent;

  get show() { return !!this.content; }

  constructor() { }

  ngOnInit(): void {
  }

  setContent(newContent?: LayoutWrapperSelectEvent) {
    const oldContent = this.content;
    if (oldContent) {
      oldContent.selectedTarget.classList.remove('now-edit');
    }
    if (newContent) {
      newContent.selectedTarget.classList.add('now-edit');
    }
    this.content = newContent;
  }

  getTemplateInfoType(templateInfo: ContentTemplateInfo): TemplateInfoType {
    if (templateInfo['tabList']) {
      return TemplateInfoType.TAB;
    }
    if (templateInfo['source']) {
      return TemplateInfoType.DATA_SOURCE;
    }
    if (templateInfo['itemList']) {
      return TemplateInfoType.GROUP;
    }
    return TemplateInfoType.COMMON;
  }

}
