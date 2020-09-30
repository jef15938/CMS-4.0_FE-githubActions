import { Component, OnInit, ViewEncapsulation, Injector } from '@angular/core';
import { CustomizeBaseDirective } from '../base-component';

@Component({
  selector: 'rdr-mega-menu',
  templateUrl: './mega-menu.component.html',
  styleUrls: ['./mega-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MegaMenuComponent extends CustomizeBaseDirective implements OnInit {

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

}
