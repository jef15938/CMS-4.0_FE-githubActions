import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { LayoutWrapperSelectEvent, TabInfo, TabTemplateInfo } from '@neux/render';
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

  templateInfo: TabTemplateInfo;

  constructor(
    private modalService: ModalService
  ) { super(); }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selected) {
      const event = changes.selected.currentValue as LayoutWrapperSelectEvent;
      this.templateInfo = event?.templateInfo as TabTemplateInfo;
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
      const newTab: TabInfo = JSON.parse(JSON.stringify(tab));
      newTab.tabId = `${new Date().getTime()}`;
      this.templateInfo.tabList.push(newTab);
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

  onInputModelChange(inputValue: string, tab: TabInfo, input: HTMLInputElement) {
    const currentTotalLength = this.countTotalTitlesLength();
    const oldValue = tab.fieldVal;
    const currentTabTitleLength = oldValue?.length || 0;
    const newTabTitleLength = inputValue?.length || 0;
    const maxTotalTitlesLength = this.templateInfo?.attributes?.maxTotalTitlesLength || 0;
    const calculatedLength = currentTotalLength - currentTabTitleLength + newTabTitleLength;
    tab.fieldVal = inputValue;
    if (maxTotalTitlesLength > 0 && calculatedLength > maxTotalTitlesLength) {
      input.blur();
      input.value = oldValue;
      tab.fieldVal = oldValue;
      this.modalService.openMessage({ message: '頁籤標題總字數超過限制' }).subscribe();
    }
  }

  countTotalTitlesLength() {
    const tabs = this.templateInfo?.tabList || [];
    return tabs.map(t => t.fieldVal || '').reduce((a, b) => a + b.length, 0);
  }


}
