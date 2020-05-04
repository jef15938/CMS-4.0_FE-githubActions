import { Component, OnInit,Input } from '@angular/core';
@Component({
  selector: 'app-tab-item',
  template: `
        <p *ngIf="show">
            <ng-content></ng-content>
        </p>
    `,
  styleUrls: ['./tab-item.component.scss']
})
export class TabItemComponent implements OnInit {
  public show:boolean = false;
  @Input()
    tabTitle:string;

  constructor() { }

  ngOnInit() {
  }

}
