import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cms-layout-control-panel',
  templateUrl: './layout-control-panel.component.html',
  styleUrls: ['./layout-control-panel.component.scss']
})
export class LayoutControlPanelComponent implements OnInit {

  @Input() position = -1;

  get show() { return this.position > -1; }

  constructor() { }

  ngOnInit(): void {
  }

}
