import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cms-news-temp',
  templateUrl: './news-temp.component.html',
  styleUrls: ['./news-temp.component.scss']
})
export class NewsTempComponent implements OnInit {

  readonly funcId = 'news-temp';

  constructor() { }

  ngOnInit(): void {
  }

}
