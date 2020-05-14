import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ElementRef } from '@angular/core';
import { ContentInfo } from 'projects/cms-lib/src/lib/neuxAPI/bean/ContentInfo';
import { LayoutWrapperSelectEvent, LayoutWrapperComponent } from 'layout';

@Component({
  selector: 'cms-content-view-renderer',
  templateUrl: './content-view-renderer.component.html',
  styleUrls: ['./content-view-renderer.component.scss']
})
export class ContentViewRendererComponent implements OnInit, AfterViewInit {

  private _nowSelectedTarget: HTMLElement;

  @Input() contentInfo: ContentInfo;

  @Output() select = new EventEmitter<LayoutWrapperSelectEvent>();

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }

  renderAddTemplateButton(layoutWrappers: LayoutWrapperComponent[]) {

  }

  onSelect(ev: LayoutWrapperSelectEvent) {
    const oldSelectedTarget = this._nowSelectedTarget;
    if (oldSelectedTarget) { oldSelectedTarget.classList.remove('now-edit'); }

    const newSelectedTarget = ev.selectedTarget;
    if (newSelectedTarget) { newSelectedTarget.classList.add('now-edit'); }

    this._nowSelectedTarget = newSelectedTarget;

    this.select.next(ev);
  }

  onEnter(target: HTMLElement) {
    target.classList.add('now-hover');
  }

  onLeave(target: HTMLElement) {
    target.classList.remove('now-hover');
  }

}
