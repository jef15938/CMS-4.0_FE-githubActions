import { Component, OnInit, ViewEncapsulation, Injector } from '@angular/core';
import { CustomizeBaseDirective } from '../base-component';

@Component({
  selector: 'rdr-fast-tool',
  templateUrl: './fast-tool.component.html',
  styleUrls: ['./fast-tool.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FastToolComponent extends CustomizeBaseDirective implements OnInit {

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

}
