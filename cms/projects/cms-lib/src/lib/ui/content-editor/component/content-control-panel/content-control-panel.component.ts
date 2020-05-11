import { Component, OnInit, Input } from '@angular/core';
import { ContentInfo } from 'projects/cms-lib/src/lib/neuxAPI/bean/ContentInfo';

@Component({
  selector: 'cms-content-control-panel',
  templateUrl: './content-control-panel.component.html',
  styleUrls: ['./content-control-panel.component.scss']
})
export class ContentControlPanelComponent implements OnInit {

  @Input() content: ContentInfo;

  get show() { return !!this.content; }

  constructor() { }

  ngOnInit(): void {
  }

}
