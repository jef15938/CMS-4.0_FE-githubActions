import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CmsFarmFormInfo, CmsFarmFormColumn } from 'projects/cms-lib/src/lib/type/farm.class';
import { CmsFarmFormColumnDisplayType } from 'projects/cms-lib/src/lib/type/farm.enum';

@Component({
  selector: 'cms-farm-search-info',
  templateUrl: './farm-search-info.component.html',
  styleUrls: ['./farm-search-info.component.scss']
})
export class FarmSearchInfoComponent implements OnInit {

  CmsFarmFormColumnDisplayType = CmsFarmFormColumnDisplayType;

  @Input() searchInfo: CmsFarmFormInfo;

  rows: CmsFarmFormColumn[][];

  @Output() needQuery = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    const split_size = this.searchInfo.split_size;

    let rowCounts = this.searchInfo.columns.length / split_size;
    const floor = Math.floor(rowCounts);
    rowCounts = rowCounts > floor ? floor + 1 : rowCounts;

    const rows: CmsFarmFormColumn[][] = [];
    for (let i = 0, l = rowCounts; i < l; ++i) {
      const min = i * split_size;
      const max = min + split_size;
      const columnsInRow = this.searchInfo.columns.filter((_, index) => index >= min && index < max);
      rows.push(columnsInRow);
    }

    this.rows = rows;
  }

  query() {
    this.needQuery.emit();
  }

  clear() {
    this.needQuery.emit();
  }

}
