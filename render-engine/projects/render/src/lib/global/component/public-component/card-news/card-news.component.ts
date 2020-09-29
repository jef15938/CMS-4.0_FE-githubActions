import { Component, Injector, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CustomizeBaseDirective } from '../base-component';
import { CardNewsData } from './card-news.interface';

@Component({
  selector: 'rdr-card-news',
  templateUrl: './card-news.component.html',
  styleUrls: ['./card-news.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardNewsComponent extends CustomizeBaseDirective implements OnInit {

  @Input() cardNewsData: CardNewsData;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

}
