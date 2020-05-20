import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { LayoutWrapperSelectEvent, GroupTemplateInfo, FieldInfo, GroupTemplateDemoComponent } from 'layout';
import { ContentControlBase } from '../../_base';

@Component({
  selector: 'cms-template-control-group',
  templateUrl: './template-control-group.component.html',
  styleUrls: ['./template-control-group.component.scss']
})
export class TemplateControlGroupComponent extends ContentControlBase implements OnInit, OnChanges {

  parseInt = parseInt;

  templateInfo: GroupTemplateInfo;
  groupItemDisplayFieldId: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selected']) {
      const event = changes['selected'].currentValue as LayoutWrapperSelectEvent;
      this.templateInfo = event?.templateInfo as GroupTemplateInfo;
      const componentInstance = event.componentRef.instance as GroupTemplateDemoComponent;
      this.groupItemDisplayFieldId = componentInstance.groupItemDisplayFieldId;
    }
  }

  ngOnInit(): void {
  }

  onListDropped(ev: { currentIndex: number, previousIndex: number }): void {
    const beforeIndex = ev.previousIndex;
    const afterIndex = ev.currentIndex;
    if (beforeIndex === afterIndex) { return; }
    this._arrayMove(this.templateInfo.itemList, beforeIndex, afterIndex);
    this.change.emit();
  }

  private _arrayMove(arr: any[], beforeIndex: number, afterIndex: number) {
    if (afterIndex >= arr.length) {
      var k = afterIndex - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(afterIndex, 0, arr.splice(beforeIndex, 1)[0]);
    return arr; // for testing
  };

  copyGroup(group: FieldInfo[]) {
    this.templateInfo.itemList.push(JSON.parse(JSON.stringify(group)));
    this.change.emit();
  }

  removeGroup(group: FieldInfo[]) {
    this.templateInfo.itemList.splice(this.templateInfo.itemList.indexOf(group), 1);
    this.change.emit();
  }

  findFieldByFieldId(fields: FieldInfo[], field: string) {
    return fields.find(f => f.fieldId === field);
  }


}
