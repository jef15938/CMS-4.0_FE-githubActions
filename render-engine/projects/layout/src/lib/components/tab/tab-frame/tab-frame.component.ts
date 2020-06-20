import { Component, OnInit, AfterContentInit, ContentChildren, QueryList } from '@angular/core';
import { TabItemComponent } from '../tab-item/tab-item.component';

@Component({
  selector: 'lib-tab-frame',
  templateUrl: './tab-frame.component.html',
  styleUrls: ['./tab-frame.component.scss']
})
export class TabFrameComponent implements OnInit, AfterContentInit {

  constructor() { }

  @ContentChildren(TabItemComponent)
  tabs: QueryList<TabItemComponent>;

  selectedTab: TabItemComponent;

  ngAfterContentInit() {
    this.select(this.tabs.first);
  }

  onSelect(tab) {
    this.select(tab);
  }

  select(tab) {
    this.tabs.forEach((item) => {
      item.show = false;
    });

    this.selectedTab = tab;
    setTimeout(() => {
      this.selectedTab.show = true;
    });
  }

  ngOnInit() {
  }

}
