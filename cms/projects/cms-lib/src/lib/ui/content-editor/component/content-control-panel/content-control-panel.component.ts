import { Component, OnInit } from '@angular/core';
import { ContentTemplateInfo } from 'projects/cms-lib/src/lib/neuxAPI/bean/ContentTemplateInfo';
import { LayoutWrapperEvent } from 'layout';
import { LayoutWrapperStatus } from '../../content-editor.enum';

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
      (oldContent.wrapper.containerDiv.nativeElement as HTMLElement).classList.remove(LayoutWrapperStatus.Edit);
      (oldContent.wrapper.containerDiv.nativeElement as HTMLElement).classList.remove(LayoutWrapperStatus.Hover);
    }
    if (newContent) {
      (newContent.wrapper.containerDiv.nativeElement as HTMLElement).classList.remove(LayoutWrapperStatus.Hover);
      (newContent.wrapper.containerDiv.nativeElement as HTMLElement).classList.add(LayoutWrapperStatus.Edit);
    }
    this.content = newContent;
    this.isTemplate = isTemplate;
  }

  onContentIn(ev: LayoutWrapperEvent) {
    if (!(ev.wrapper.containerDiv.nativeElement as HTMLElement).classList.contains(LayoutWrapperStatus.Edit)) {
      (ev.wrapper.containerDiv.nativeElement as HTMLElement).classList.add(LayoutWrapperStatus.Hover);
    }
  }

  onContentOut(ev: LayoutWrapperEvent) {
    (ev.wrapper.containerDiv.nativeElement as HTMLElement).classList.remove(LayoutWrapperStatus.Hover);
  }

}
