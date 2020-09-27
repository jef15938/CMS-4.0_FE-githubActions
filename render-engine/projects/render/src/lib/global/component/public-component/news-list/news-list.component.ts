import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rdr-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {

  newsList: Array<{ title: string, date: Date }> = [
    { title: '台灣人壽國旅調查  民眾偏愛東部、親子台灣人壽國旅調查  民眾偏愛東部、親子', date: new Date('2020/08/24') },
    { title: '台灣人壽獲獎連連　再奪國際7大獎肯定', date: new Date('2019/05/21') },
    { title: '掌握「人生安穩傳」保單檢視免操煩。', date: new Date('2018-05-20') },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
