import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { LayoutWrapperSelectEvent, TabInfo, TabTemplateInfo, TabTemplateBaseComponent } from 'layout';
import { ContentControlBase } from '../../_base';

@Component({
  selector: 'cms-template-control-tab',
  templateUrl: './template-control-tab.component.html',
  styleUrls: ['./template-control-tab.component.scss']
})
export class TemplateControlTabComponent extends ContentControlBase implements OnInit, OnChanges {

  parseInt = parseInt;

  maxItemCount: number;
  templateInfo: TabTemplateInfo;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selected']) {
      const event = changes['selected'].currentValue as LayoutWrapperSelectEvent;
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
    this._arrayMove(this.templateInfo.tabList, beforeIndex, afterIndex);
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

  addTab() {
    const newTab = {
      tabId: 'NewTab',
      children: [],
    } as TabInfo;
    this.templateInfo.tabList.push(newTab);
    this.change.emit();
  }

  removeTab(tab: TabInfo) {
    this.templateInfo.tabList.splice(this.templateInfo.tabList.indexOf(tab), 1);
    this.change.emit();
  }


}
