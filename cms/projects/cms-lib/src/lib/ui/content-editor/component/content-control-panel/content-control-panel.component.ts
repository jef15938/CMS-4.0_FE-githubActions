import { Component, OnInit } from '@angular/core';
import { LayoutWrapperSelectEvent } from 'layout';

@Component({
  selector: 'cms-content-control-panel',
  templateUrl: './content-control-panel.component.html',
  styleUrls: ['./content-control-panel.component.scss']
})
export class ContentControlPanelComponent implements OnInit {

  content: LayoutWrapperSelectEvent;
  isTemplate = false;

  get show() { return !!this.content; }

  constructor() { }

  ngOnInit(): void {
  }

  setContent(newContent?: LayoutWrapperSelectEvent, isTemplate = false) {
    const oldContent = this.content;
    if (oldContent) {
      oldContent.selectedTarget.classList.remove('now-edit');
    }
    if (newContent) {
      newContent.selectedTarget.classList.add('now-edit');
    }
    this.content = newContent;
    this.isTemplate = isTemplate;
  }

}
