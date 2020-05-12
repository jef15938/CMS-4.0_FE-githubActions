import { Component, OnInit } from '@angular/core';
import { LayoutWrapperEvent } from 'layout';

@Component({
  selector: 'cms-content-control-panel',
  templateUrl: './content-control-panel.component.html',
  styleUrls: ['./content-control-panel.component.scss']
})
export class ContentControlPanelComponent implements OnInit {

  content: LayoutWrapperEvent;
  isTemplate = false;

  get show() { return !!this.content; }

  constructor() { }

  ngOnInit(): void {
  }

  setContent(newContent?: LayoutWrapperEvent, isTemplate = false) {
    const oldContent = this.content;
    if (oldContent) {
      oldContent.wrapper.setNowEdit(false);
    }
    if (newContent) {
      newContent.wrapper.setNowEdit(true);
    }
    this.content = newContent;
    this.isTemplate = isTemplate;
  }

}
