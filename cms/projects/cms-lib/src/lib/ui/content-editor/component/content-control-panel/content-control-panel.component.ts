import { Component, OnInit } from '@angular/core';
import { LayoutWrapperSelectEvent, FieldType, LayoutWrapperSelectedTargetType } from 'layout';

@Component({
  selector: 'cms-content-control-panel',
  templateUrl: './content-control-panel.component.html',
  styleUrls: ['./content-control-panel.component.scss']
})
export class ContentControlPanelComponent implements OnInit {

  LayoutWrapperSelectedTargetType = LayoutWrapperSelectedTargetType;
  FieldType = FieldType;

  content: LayoutWrapperSelectEvent;

  get show() { return !!this.content; }

  constructor() { }

  ngOnInit(): void {
  }

  setContent(newContent?: LayoutWrapperSelectEvent) {
    const oldContent = this.content;
    if (oldContent) {
      oldContent.selectedTarget.classList.remove('now-edit');
    }
    if (newContent) {
      newContent.selectedTarget.classList.add('now-edit');
    }
    this.content = newContent;
  }

}
