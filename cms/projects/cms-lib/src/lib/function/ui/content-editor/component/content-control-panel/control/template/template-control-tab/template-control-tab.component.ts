import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { LayoutWrapperSelectEvent, TabInfo, TabTemplateInfo, TabTemplateBaseComponent } from '@neux/render';
import { ContentControlBase } from '../../_base';
import { ModalService } from '../../../../../../../../function/ui/modal';
import { CmsErrorHandler } from '../../../../../../../../global/error-handling';

@Component({
  selector: 'cms-template-control-tab',
  templateUrl: './template-control-tab.component.html',
  styleUrls: ['./template-control-tab.component.scss']
})
export class TemplateControlTabComponent extends ContentControlBase implements OnInit, OnChanges {

  parseInt = parseInt;

  maxItemCount: number;
  templateInfo: TabTemplateInfo;

  constructor(
    private modalService: ModalService
  ) { super(); }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selected) {
      const event = changes.selected.currentValue as LayoutWrapperSelectEvent;
      this.templateInfo = event?.templateInfo as TabTemplateInfo;
      const componentInstance = event.componentRef.instance as TabTemplateBaseComponent;
      this.maxItemCount = componentInstance.maxItemCount;
    }
  }

  ngOnInit(): void {
  }

  onListDropped(ev: { currentIndex: number, previousIndex: number }): void {
    const beforeIndex = ev.previousIndex;
    const afterIndex = ev.currentIndex;
    if (beforeIndex === afterIndex) { return; }
    this.arrayMove(this.templateInfo.tabList, beforeIndex, afterIndex);
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

  copyTab(tab: TabInfo) {
    try {
      this.templateInfo.tabList.push(JSON.parse(JSON.stringify(tab)));
      this.change.emit();
    } catch (error) {
      CmsErrorHandler.throwAndShow(error, 'TemplateControlTabComponent.copyTab()', 'JSON 資料解析錯誤');
    }
  }

  removeTab(tab: TabInfo) {
    if (this.templateInfo.tabList.length <= 1) {
      this.modalService.openMessage({ message: '最後一個項目不可刪除' });
      return;
    }
    this.templateInfo.tabList.splice(this.templateInfo.tabList.indexOf(tab), 1);
    this.change.emit();
  }


}
