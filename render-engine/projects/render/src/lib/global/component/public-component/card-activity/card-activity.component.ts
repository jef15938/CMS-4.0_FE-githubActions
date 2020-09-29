import { Component, Injector, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CustomizeBaseDirective } from '../base-component';
import { CardActivityData } from './card-activity.interface';

@Component({
  selector: 'rdr-card-activity',
  templateUrl: './card-activity.component.html',
  styleUrls: ['./card-activity.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardActivityComponent extends CustomizeBaseDirective implements OnInit {

  @Input() cardActivityData: CardActivityData;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

}
