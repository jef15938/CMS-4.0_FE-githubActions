import { Component, OnInit, ViewEncapsulation, Injector, Input, Output, EventEmitter } from '@angular/core';
import { CustomizeBaseDirective } from '../base-component';

@Component({
  selector: 'rdr-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchBarComponent extends CustomizeBaseDirective implements OnInit {

  @Input() placeholder = '搜尋所有商品';

  @Output() keywordsChange: EventEmitter<string> = new EventEmitter();
  keywords = '';

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
  }

  send(formValue) {
    this.keywordsChange.emit(formValue);
  }

}
