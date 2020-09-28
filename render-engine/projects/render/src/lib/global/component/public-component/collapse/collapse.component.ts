import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'rdr-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CollapseComponent implements OnInit {

  @Input() dataList: Array<{ question: string, answer: string }>;

  constructor() { }

  ngOnInit(): void {
  }

}
