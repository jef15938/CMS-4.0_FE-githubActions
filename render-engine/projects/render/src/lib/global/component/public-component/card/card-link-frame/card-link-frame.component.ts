import { Component, Injector, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CustomizeBaseDirective } from '../../base-component';

@Component({
  selector: 'rdr-card-link-frame',
  templateUrl: './card-link-frame.component.html',
  styleUrls: ['./card-link-frame.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardLinkFrameComponent extends CustomizeBaseDirective implements OnInit {

  @Input() linkUrl: string;
  @Input() target: string;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

}
