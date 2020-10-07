import { Component, OnInit, Injector, ViewEncapsulation, Input } from '@angular/core';
import { CustomizeBaseDirective } from '../../base-component';

export interface CardNewsListData {
  url: string;
  date: Date;
  title: string;
}

@Component({
  selector: 'rdr-card-news-list',
  templateUrl: './card-news-list.component.html',
  styleUrls: ['./card-news-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardNewsListComponent extends CustomizeBaseDirective implements OnInit {

  @Input() title: string;
  @Input() newsList: CardNewsListData[];

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

}
