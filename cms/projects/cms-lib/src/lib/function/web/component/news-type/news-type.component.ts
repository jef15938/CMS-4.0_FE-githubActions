import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cms-news-type',
  templateUrl: './news-type.component.html',
  styleUrls: ['./news-type.component.scss']
})
export class NewsTypeComponent implements OnInit {

  readonly funcId = 'news-type';

  constructor() { }

  ngOnInit(): void {
  }

}
