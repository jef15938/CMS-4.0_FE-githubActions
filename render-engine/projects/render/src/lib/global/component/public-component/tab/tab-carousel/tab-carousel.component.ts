import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { TabData } from '../tab.inerface';

@Component({
  selector: 'rdr-tab-carousel',
  templateUrl: './tab-carousel.component.html',
  styleUrls: ['./tab-carousel.component.scss']
})
export class TabCarouselComponent implements OnInit {

  @Input() tabList: TabData[] = [
    { title: '標籤最多十五字', content: '' },
    { title: '標籤最多十五字', content: '' },
    { title: '標籤最多十五字', content: '' },
    { title: '標籤最多十五字', content: '' },
    { title: '標籤最多十五字', content: '' },
  ];

  @ContentChild('content') contentTemplateRef: TemplateRef<any>;
  constructor() {
  }

  ngOnInit(): void {
  }

}
