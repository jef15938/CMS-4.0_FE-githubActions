import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'rdr-tl-tab-item',
  templateUrl: './tab-item.component.html',
  styleUrls: ['./tab-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TlTabItemComponent implements OnInit {

  public show = false;
  @Input()
  title: string;

  constructor() { }

  ngOnInit(): void {
  }

}
