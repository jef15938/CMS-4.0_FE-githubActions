import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LayoutWrapperSelectEvent, FieldType, LayoutWrapperSelectedTargetType, TemplateType } from 'layout';
import { ContentInfoManager } from '../../service/content-info-manager';

@Component({
  selector: 'cms-content-control-panel',
  templateUrl: './content-control-panel.component.html',
  styleUrls: ['./content-control-panel.component.scss']
})
export class ContentControlPanelComponent implements OnInit {

  TemplateType = TemplateType;

  @Input() contentInfoManager: ContentInfoManager;

  @Output() changePreserve = new EventEmitter();

  LayoutWrapperSelectedTargetType = LayoutWrapperSelectedTargetType;
  FieldType = FieldType;

  // 用來判斷資料是否異動過
  hasChange = false;

  selected: LayoutWrapperSelectEvent;

  get show() { return !!this.selected; }

  constructor() { }

  ngOnInit(): void {
  }

  setSelected(newSelected?: LayoutWrapperSelectEvent) {
    const oldSelected = this.selected;
    if (oldSelected) {
      oldSelected.selectedTarget.classList.remove('now-edit');
    }
    if (newSelected) {
      newSelected.selectedTarget.classList.add('now-edit');
      this.hasChange = false;
    }
    this.selected = newSelected;
  }

  preserveChanges() {
    const targetType = this.selected.selectedTargetType;
    let target: string[] = [];
    switch (targetType) {
      case LayoutWrapperSelectedTargetType.TEMPLATE:
        target.push(`[${LayoutWrapperSelectedTargetType.TEMPLATE}]${this.selected.templateInfo.id}`);
        break;
      case LayoutWrapperSelectedTargetType.FIELD:
        target.push(`[${LayoutWrapperSelectedTargetType.TEMPLATE}]${this.selected.templateInfo.id}`);
        target.push(`[${LayoutWrapperSelectedTargetType.FIELD}]${this.selected.fieldInfo.fieldId}`);
        break;
    }
    this.contentInfoManager.preserveState(`Change ${targetType} : ${target.join(' ')}`);
    this.hasChange = false;
    this.changePreserve.emit();
  }

}
