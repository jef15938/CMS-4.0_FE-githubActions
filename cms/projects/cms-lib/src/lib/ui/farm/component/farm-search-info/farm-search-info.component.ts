import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CmsFarmFormInfo } from 'projects/cms-lib/src/lib/type/farm.class';

@Component({
  selector: 'cms-farm-search-info',
  templateUrl: './farm-search-info.component.html',
  styleUrls: ['./farm-search-info.component.scss']
})
export class FarmSearchInfoComponent implements OnInit {

  @Input() searchInfo: CmsFarmFormInfo;

  @Output() needQuery = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void { }

  query() {
    this.needQuery.emit();
  }

  clear() {
    this.needQuery.emit();
  }

}
