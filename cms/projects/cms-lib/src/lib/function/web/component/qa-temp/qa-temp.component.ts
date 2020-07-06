import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cms-qa-temp',
  templateUrl: './qa-temp.component.html',
  styleUrls: ['./qa-temp.component.scss']
})
export class QaTempComponent implements OnInit {

  readonly funcId = 'qa-temp';

  constructor() { }

  ngOnInit(): void {
  }

}
