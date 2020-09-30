import { Component, OnInit, ViewEncapsulation, Injector } from '@angular/core';
import { CustomizeBaseDirective } from '../base-component';

@Component({
  selector: 'rdr-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchBarComponent extends CustomizeBaseDirective implements OnInit {

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

}
