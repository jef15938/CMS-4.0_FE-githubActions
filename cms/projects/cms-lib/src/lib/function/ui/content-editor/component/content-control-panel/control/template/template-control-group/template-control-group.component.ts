import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { LayoutWrapperSelectEvent, GroupTemplateInfo, GroupTemplateBaseComponent } from '@neux/render';
import { ContentControlBase } from '../../_base';
import { ContentFieldInfoModel } from '../../../../../../../../global/api/data-model/models/content-field-info.model';
import { CmsErrorHandler } from '../../../../../../../../global/error-handling';
import { ModalService } from '../../../../../../../../function/ui/modal';

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

  constructor(
    private modalService: ModalService
  ) { super(); }

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
    try {
      this.templateInfo.itemList.push(JSON.parse(JSON.stringify(group)));
      this.change.emit();
    } catch (error) {
      CmsErrorHandler.throwAndShow(error, 'TemplateControlGroupComponent.copyGroup()', 'JSON 資料解析錯誤');
    }
  }

  removeGroup(group: ContentFieldInfoModel[]) {
    if (this.templateInfo.itemList.length <= 1) {
      this.modalService.openMessage({ message: '最後一個項目不可刪除' });
      return;
    }
    this.templateInfo.itemList.splice(this.templateInfo.itemList.indexOf(group), 1);
    this.change.emit();
  }

  findFieldByFieldId(fields: ContentFieldInfoModel[], field: string) {
    return fields.find(f => f.fieldId === field);
  }


}
