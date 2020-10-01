import { Component, Injector, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CustomizeBaseDirective } from '../../base-component';
import { CardLinkData } from './card-link.interface';

@Component({
  selector: 'rdr-card-link',
  templateUrl: './card-link.component.html',
  styleUrls: ['./card-link.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardLinkComponent extends CustomizeBaseDirective implements OnInit {

  @Input() cardLinkData: CardLinkData;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

}
