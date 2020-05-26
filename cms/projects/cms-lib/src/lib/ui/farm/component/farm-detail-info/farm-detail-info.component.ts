import { Component, OnInit, Input } from '@angular/core';
import { CmsFarmFormInfo, CmsFarmFormColumn } from 'projects/cms-lib/src/lib/type/farm.class';

@Component({
  selector: 'cms-farm-detail-info',
  templateUrl: './farm-detail-info.component.html',
  styleUrls: ['./farm-detail-info.component.scss']
})
export class FarmDetailInfoComponent implements OnInit {

  @Input() detailInfo: CmsFarmFormInfo;

  rows: CmsFarmFormColumn[][];

  constructor() { }

  ngOnInit(): void {
    const split_size = this.detailInfo.split_size;

    let rowCounts = this.detailInfo.columns.length / split_size;
    const floor = Math.floor(rowCounts);
    rowCounts = rowCounts > floor ? floor + 1 : rowCounts;

    const rows: CmsFarmFormColumn[][] = [];
    for (let i = 0, l = rowCounts; i < l; ++i) {
      const min = i * split_size;
      const max = min + split_size;
      const columnsInRow = this.detailInfo.columns.filter((_, index) => index >= min && index < max);
      rows.push(columnsInRow);
    }

    this.rows = rows;
  }

}
