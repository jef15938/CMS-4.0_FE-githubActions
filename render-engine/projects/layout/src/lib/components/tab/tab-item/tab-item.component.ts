import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'lib-tab-item',
  template: `
        <ng-container *ngIf="show">
            <ng-content></ng-content>
        </ng-container>
    `,
  styleUrls: ['./tab-item.component.scss']
})
export class TabItemComponent implements OnInit {
  public show = false;
  @Input()
  tabTitle: string;

  constructor() { }

  ngOnInit() {
  }

}
