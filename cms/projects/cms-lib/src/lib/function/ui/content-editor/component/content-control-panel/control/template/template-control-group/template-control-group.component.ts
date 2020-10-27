import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { LayoutWrapperSelectEvent, GroupTemplateInfo, GroupItem } from '@neux/render';
import { ContentControlBase } from '../../_base';
import { CmsErrorHandler } from '../../../../../../../../global/error-handling';
import { ModalService } from '../../../../../../../../function/ui/modal';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'cms-template-control-group',
  templateUrl: './template-control-group.component.html',
  styleUrls: ['./template-control-group.component.scss']
})
export class TemplateControlGroupComponent extends ContentControlBase implements OnInit, OnChanges {

  parseInt = parseInt;

  templateInfo: GroupTemplateInfo;

  constructor(
    private modalService: ModalService
  ) { super(); }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selected) {
      const event = changes.selected.currentValue as LayoutWrapperSelectEvent;
      this.templateInfo = event?.templateInfo as GroupTemplateInfo;
    }
  }

  ngOnInit(): void {
  }

  onListDropped(ev: { currentIndex: number, previousIndex: number }): void {
    const beforeIndex = ev.previousIndex;
    const afterIndex = ev.currentIndex;
    if (beforeIndex === afterIndex) { return; }
    const itemList = [...(this.templateInfo.itemList || [])];
    this.arrayMove(itemList, beforeIndex, afterIndex);
    this.templateInfo.itemList = itemList;
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

  copyGroup(groupItems: GroupItem[]) {
    try {
      const itemList = [...(this.templateInfo.itemList || [])];
      itemList.push(JSON.parse(JSON.stringify(groupItems)));
      this.templateInfo.itemList = itemList;
      this.change.emit();
    } catch (error) {
      CmsErrorHandler.throwAndShow(error, 'TemplateControlGroupComponent.copyGroup()', 'JSON 資料解析錯誤');
    }
  }

  removeGroup(groupItems: GroupItem[]) {
    if (this.templateInfo.itemList.length <= 1) {
      this.modalService.openMessage({ message: '最後一個項目不可刪除' });
      return;
    }
    const itemList = [...(this.templateInfo.itemList || [])];
    itemList.splice(this.templateInfo.itemList.indexOf(groupItems), 1);
    this.templateInfo.itemList = itemList;
    this.change.emit();
  }

  findFieldByFieldId(groupItems: GroupItem[], field: string) {
    return groupItems.find(item => item.fieldId === field);
  }

  checkHidden(groupItems: GroupItem[]) {
    return groupItems.some(item => !!item.extension?.hideden);
  }

  toggleHidden(ev: MatCheckboxChange, groupItems: GroupItem[]) {
    console.warn({ ev, groupItems });
    groupItems.forEach(item => {
      item.extension = item.extension || ({} as any);
      item.extension.hideden = ev.checked;
    });
    this.change.emit();
  }

}
