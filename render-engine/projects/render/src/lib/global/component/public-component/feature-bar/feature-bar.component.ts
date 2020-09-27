import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rdr-feature-bar',
  templateUrl: './feature-bar.component.html',
  styleUrls: ['./feature-bar.component.scss']
})
export class FeatureBarComponent implements OnInit {

  featureList: Array<string> = ['專業獎項', '公平待客', '網站聲明'];
  constructor() { }

  ngOnInit(): void {
  }

}
