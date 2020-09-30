import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { TabData } from '../tab.inerface';

@Component({
  selector: 'rdr-tab-scrollable',
  templateUrl: './tab-scrollable.component.html',
  styleUrls: ['./tab-scrollable.component.scss']
})
export class TabScrollableComponent implements OnInit {

  @Input() tabList: TabData[] = [
    { title: '標籤最多六字', content: '' },
    { title: '標籤最多六字', content: '' },
    { title: '標籤最多六字', content: '' },
  ];

  @ContentChild('content') contentTemplateRef: TemplateRef<any>;
  constructor() {
  }

  ngOnInit(): void {
  }

}
