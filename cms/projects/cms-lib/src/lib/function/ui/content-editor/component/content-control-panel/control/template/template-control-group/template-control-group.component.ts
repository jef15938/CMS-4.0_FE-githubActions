import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { LayoutWrapperSelectEvent, GroupTemplateInfo, GroupTemplateBaseComponent } from '@neux/render';
import { ContentControlBase } from '../../_base';
import { ContentFieldInfoModel } from '../../../../../../../../global/api/data-model/models/content-field-info.model';

@Component({
  selector: 'cms-template-control-group',
  templateUrl: './template-control-group.component.html',
  styleUrls: ['./template-control-group.component.scss']
})
export class TemplateControlGroupComponent extends ContentControlBase implements OnInit, OnChanges {

  parseInt = parseInt;

  templateInfo: GroupTemplateInfo;

  maxItemCount: number;
  groupItemDisplayFieldId: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selected) {
      const event = changes.selected.currentValue as LayoutWrapperSelectEvent;
      this.templateInfo = event?.templateInfo as GroupTemplateInfo;
      const componentInstance = event.componentRef.instance as GroupTemplateBaseComponent;
      this.groupItemDisplayFieldId = componentInstance.groupItemDisplayFieldId;
      this.maxItemCount = componentInstance.maxItemCount;
    }
  }

  ngOnInit(): void {
  }

  onListDropped(ev: { currentIndex: number, previousIndex: number }): void {
    const beforeIndex = ev.previousIndex;
    const afterIndex = ev.currentIndex;
    if (beforeIndex === afterIndex) { return; }
    this.arrayMove(this.templateInfo.itemList, beforeIndex, afterIndex);
    this.change.emit();
  }

  private arrayMove(arr: any[], beforeIndex: number, afterIndex: number) {
    if (afterIndex >= arr.length) {
      let k = afterIndex - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(afterIndex, 0, arr.splice(beforeIndex, 1)[0]);
    return arr; // for testing
  }

  copyGroup(group: ContentFieldInfoModel[]) {
    this.templateInfo.itemList.push(JSON.parse(JSON.stringify(group)));
    this.change.emit();
  }

  removeGroup(group: ContentFieldInfoModel[]) {
    this.templateInfo.itemList.splice(this.templateInfo.itemList.indexOf(group), 1);
    this.change.emit();
  }

  findFieldByFieldId(fields: ContentFieldInfoModel[], field: string) {
    return fields.find(f => f.fieldId === field);
  }


}
