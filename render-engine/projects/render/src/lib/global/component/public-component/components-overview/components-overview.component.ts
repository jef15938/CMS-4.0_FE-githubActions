import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rdr-components-overview',
  templateUrl: './components-overview.component.html',
  styleUrls: ['./components-overview.component.scss']
})
export class ComponentsOverviewComponent implements OnInit {

  test = '123s';
  test2: string;

  constructor() { }

  ngOnInit(): void {
  }


  log(event) {
    console.log(event);
  }

  valueChange(event) {
    console.log('raio test ngModel', event, this.test2);
  }
}
