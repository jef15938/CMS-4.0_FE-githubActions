import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CmsFarmFormInfo } from 'projects/cms-lib/src/lib/type/farm.class';
import { FarmFormInfoComponent } from '../farm-form-info/farm-form-info.component';

@Component({
  selector: 'cms-farm-search-info',
  templateUrl: './farm-search-info.component.html',
  styleUrls: ['./farm-search-info.component.scss']
})
export class FarmSearchInfoComponent implements OnInit {

  @Input() searchInfo: CmsFarmFormInfo;

  @Output() needQuery = new EventEmitter<FarmFormInfoComponent>();

  constructor() { }

  ngOnInit(): void { }

  query(comp: FarmFormInfoComponent) {
    this.needQuery.emit(comp);
  }

  clear(comp: FarmFormInfoComponent) {
    this.needQuery.emit(comp);
  }

}
